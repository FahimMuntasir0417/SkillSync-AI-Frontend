type StatusMessageProps = {
  title: string;
  message: string;
  tone?: "default" | "danger" | "success";
};

export function StatusMessage({ title, message, tone = "default" }: StatusMessageProps) {
  const toneClass =
    tone === "danger"
      ? "border-danger/40 bg-danger/10 text-danger"
      : tone === "success"
        ? "border-success/40 bg-success/10 text-success"
        : "border-border bg-surface text-foreground";

  return (
    <div className={`rounded-card border p-4 ${toneClass}`}>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-85">{message}</p>
    </div>
  );
}
