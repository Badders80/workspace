param(
    [Parameter(Mandatory = $true)]
    [string]$Label,

    [string]$ResultsPath,

    [string]$OutputDir
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Resolve-ImagePath {
    param(
        [string]$PathValue
    )

    if ([string]::IsNullOrWhiteSpace($PathValue)) {
        return $null
    }

    if (Test-Path -LiteralPath $PathValue) {
        return $PathValue
    }

    if ($PathValue.StartsWith("/")) {
        $uncPath = "\\wsl.localhost\Ubuntu" + ($PathValue -replace "/", "\")
        if (Test-Path -LiteralPath $uncPath) {
            return $uncPath
        }
    }

    return $PathValue
}

function Get-TruncatedText {
    param(
        [string]$Value,
        [int]$MaxLength
    )

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return ""
    }

    if ($Value.Length -le $MaxLength) {
        return $Value
    }

    return $Value.Substring(0, [Math]::Max(0, $MaxLength - 3)) + "..."
}

function Draw-CoverImage {
    param(
        [System.Drawing.Graphics]$Graphics,
        [System.Drawing.Image]$Image,
        [int]$X,
        [int]$Y,
        [int]$Width,
        [int]$Height
    )

    $targetRatio = $Width / [double]$Height
    $imageRatio = $Image.Width / [double]$Image.Height

    if ($imageRatio -gt $targetRatio) {
        $sourceHeight = $Image.Height
        $sourceWidth = [int][Math]::Round($sourceHeight * $targetRatio)
        $sourceX = [int][Math]::Round(($Image.Width - $sourceWidth) / 2)
        $sourceY = 0
    } else {
        $sourceWidth = $Image.Width
        $sourceHeight = [int][Math]::Round($sourceWidth / $targetRatio)
        $sourceX = 0
        $sourceY = [int][Math]::Round(($Image.Height - $sourceHeight) / 2)
    }

    $destinationRect = New-Object System.Drawing.Rectangle($X, $Y, $Width, $Height)
    $sourceRect = New-Object System.Drawing.Rectangle($sourceX, $sourceY, $sourceWidth, $sourceHeight)
    $Graphics.DrawImage($Image, $destinationRect, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$assetsDir = Join-Path $projectRoot "assets"
$labelDir = Join-Path $assetsDir $Label

if (-not (Test-Path -LiteralPath $labelDir)) {
    throw "Label directory not found: $labelDir"
}

if (-not $ResultsPath) {
    $latestResults = Get-ChildItem -LiteralPath $labelDir -Filter "gemini_batch_results_*.json" -File |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1

    if (-not $latestResults) {
        throw "No gemini batch results file found under $labelDir"
    }

    $ResultsPath = $latestResults.FullName
}

if (-not (Test-Path -LiteralPath $ResultsPath)) {
    throw "Results file not found: $ResultsPath"
}

if (-not $OutputDir) {
    $OutputDir = $labelDir
}

if (-not (Test-Path -LiteralPath $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

$results = Get-Content -LiteralPath $ResultsPath -Raw | ConvertFrom-Json
$successfulResults = @(
    $results |
        Where-Object {
            $resolvedPath = Resolve-ImagePath -PathValue $_.path
            $_ | Add-Member -NotePropertyName resolved_path -NotePropertyValue $resolvedPath -Force
            $_.success -eq $true -and
            -not [string]::IsNullOrWhiteSpace($resolvedPath) -and
            (Test-Path -LiteralPath $resolvedPath)
        }
)

if ($successfulResults.Count -eq 0) {
    throw "No successful image results with existing paths were found in $ResultsPath"
}

$reviewManifestPath = Join-Path $OutputDir ("{0}_review_manifest.csv" -f $Label)
$successfulResults |
    Select-Object `
        @{ Name = "selected"; Expression = { "" } }, `
        @{ Name = "rating"; Expression = { "" } }, `
        @{ Name = "notes"; Expression = { "" } }, `
        @{ Name = "batch_results"; Expression = { $ResultsPath } }, `
        label, `
        type, `
        model, `
        provider, `
        @{ Name = "path"; Expression = { $_.path } }, `
        @{ Name = "resolved_path"; Expression = { $_.resolved_path } }, `
        @{ Name = "file_name"; Expression = { [System.IO.Path]::GetFileName($_.path) } }, `
        requested_width, `
        requested_height, `
        native_width, `
        native_height, `
        aspect_ratio, `
        image_size, `
        project, `
        location, `
        token_source, `
        prompt, `
        negative_prompt |
    Export-Csv -LiteralPath $reviewManifestPath -NoTypeInformation -Encoding UTF8

Add-Type -AssemblyName System.Drawing

$orderedResults = $successfulResults | Sort-Object type, model, path
$columns = 3
$thumbWidth = 420
$thumbHeight = 250
$padding = 24
$titleHeight = 78
$captionHeight = 56
$rows = [int][Math]::Ceiling($orderedResults.Count / [double]$columns)

$sheetWidth = ($columns * $thumbWidth) + (($columns + 1) * $padding)
$sheetHeight = $titleHeight + ($rows * ($thumbHeight + $captionHeight + $padding)) + $padding

$bitmap = New-Object System.Drawing.Bitmap($sheetWidth, $sheetHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$graphics.Clear([System.Drawing.Color]::FromArgb(18, 22, 28))

$titleFont = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::Bold)
$metaFont = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Regular)
$captionFont = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Regular)
$titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245, 247, 250))
$metaBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(172, 181, 192))
$captionBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(216, 222, 230))
$borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(52, 58, 64), 1)

$graphics.DrawString(
    ("{0} Review Sheet" -f $Label),
    $titleFont,
    $titleBrush,
    $padding,
    18
)

$graphics.DrawString(
    ("{0} images | source: {1}" -f $orderedResults.Count, [System.IO.Path]::GetFileName($ResultsPath)),
    $metaFont,
    $metaBrush,
    $padding,
    50
)

for ($index = 0; $index -lt $orderedResults.Count; $index++) {
    $result = $orderedResults[$index]
    $row = [int][Math]::Floor($index / $columns)
    $column = $index % $columns
    $x = $padding + ($column * ($thumbWidth + $padding))
    $y = $titleHeight + $padding + ($row * ($thumbHeight + $captionHeight + $padding))

    $image = [System.Drawing.Image]::FromFile($result.resolved_path)
    try {
        Draw-CoverImage -Graphics $graphics -Image $image -X $x -Y $y -Width $thumbWidth -Height $thumbHeight
    } finally {
        $image.Dispose()
    }

    $graphics.DrawRectangle($borderPen, $x, $y, $thumbWidth, $thumbHeight)

    $captionLine1 = Get-TruncatedText -Value ("{0} | {1}" -f $result.type, $result.model) -MaxLength 48
    $captionLine2 = Get-TruncatedText -Value ([System.IO.Path]::GetFileName($result.path)) -MaxLength 54
    $graphics.DrawString($captionLine1, $captionFont, $captionBrush, $x, $y + $thumbHeight + 8)
    $graphics.DrawString($captionLine2, $captionFont, $captionBrush, $x, $y + $thumbHeight + 28)
}

$contactSheetPath = Join-Path $OutputDir ("{0}_contact_sheet.png" -f $Label)

try {
    $bitmap.Save($contactSheetPath, [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
    $borderPen.Dispose()
    $titleBrush.Dispose()
    $metaBrush.Dispose()
    $captionBrush.Dispose()
    $titleFont.Dispose()
    $metaFont.Dispose()
    $captionFont.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
}

[PSCustomObject]@{
    label = $Label
    batch_results = $ResultsPath
    review_manifest = $reviewManifestPath
    contact_sheet = $contactSheetPath
    image_count = $orderedResults.Count
} | ConvertTo-Json
