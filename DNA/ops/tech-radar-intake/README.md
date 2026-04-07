# Tech Radar Intake

Capture and review repository for anything that catches your eye.

This folder is library-first, not filter-first. If something looks interesting,
save it here first and decide later whether it fits the stack.

`TECH_RADAR.md` is the decision board.
This folder is the reading library.

---

## What Lives Here

Two file shapes are valid here:

```text
YYYY-MM-DD_batch.md       <- rough capture or mixed batch
YYYY-MM-DD_[toolname].md  <- durable single-item review note
```

Historical files may mix old and new style. Going forward, the target state is:

- rough capture arrives fast
- processor turns it into a durable note
- radar verdict stays separate

---

## Workflow

```text
You spot something
      ->
Save the link, notes, screenshot, or transcript
      ->
Processor creates or updates a durable note in this folder
      ->
Processor gives a separate radar wizard recommendation
      ->
Human reviews
      ->
Codex updates TECH_RADAR.md only if wanted
```

The repository note should survive even when the final verdict is "not for us."

---

## What a Good Repository Note Contains

- topic or tool name
- source and links
- what caught your eye
- plain-English explanation
- humanized review
- how it works
- takeaways
- risks or caveats
- what to do if you revisit it later

Use `TEMPLATE.md` for the target note shape.

---

## What Does Not Live Here As Canonical

- the live adopted stack
- the final fit verdict
- permission to implement or install something

Those stay in:

- `DNA/ops/STACK.md`
- `DNA/ops/TECH_RADAR.md`
- `DNA/ops/DECISION_LOG.md`

---

## What to Dump Here

Anything that preserves the signal:

- Instagram reel or post link
- GitHub repo or README paste
- blog post excerpt
- docs link
- screenshot notes
- your own rough notes
- a single URL plus one sentence on why it mattered

Speed matters more than polish at capture time.

---

## Processor Location

Front-line prompt and how-to guide:
`/home/evo/workspace/DNA/ops/GEM_TECH_RADAR_PROCESSOR.md`

Template for durable notes:
`/home/evo/workspace/DNA/ops/tech-radar-intake/TEMPLATE.md`

Live stack for cross-reference:
`https://raw.githubusercontent.com/Badders80/workspace/main/DNA/ops/STACK.md`

Live radar for cross-reference:
`https://raw.githubusercontent.com/Badders80/workspace/main/DNA/ops/TECH_RADAR.md`

## Context Chain
<- inherits from: /home/evo/workspace/DNA/ops/TECH_RADAR.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
