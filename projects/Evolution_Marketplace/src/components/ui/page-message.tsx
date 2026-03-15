import { AlertCircle, CircleCheck } from "lucide-react";

export function PageMessage({
  error,
  message,
}: {
  error?: string;
  message?: string;
}) {
  if (!error && !message) {
    return null;
  }

  const isError = Boolean(error);

  return (
    <div
      className={`flex items-start gap-3 rounded-[24px] border px-4 py-3 text-sm ${
        isError
          ? "border-[rgba(141,67,67,0.18)] bg-[rgba(141,67,67,0.08)] text-[var(--danger)]"
          : "border-[rgba(41,82,71,0.18)] bg-[rgba(41,82,71,0.08)] text-[var(--success)]"
      }`}
    >
      {isError ? <AlertCircle size={18} /> : <CircleCheck size={18} />}
      <span>{error ?? message}</span>
    </div>
  );
}
