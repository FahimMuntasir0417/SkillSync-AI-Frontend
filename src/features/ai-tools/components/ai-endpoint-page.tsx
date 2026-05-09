"use client";

import type { LucideIcon } from "lucide-react";
import { AlertTriangle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Textarea } from "@/components/ui/textarea";

export type AiToolField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "number" | "select";
  required?: boolean;
  options?: { label: string; value: string }[];
};

type AiEndpointPageProps<TPayload> = {
  title: string;
  description: string;
  submitLabel: string;
  icon: LucideIcon;
  fields: AiToolField[];
  defaultValues: Record<string, string>;
  buildPayload: (values: Record<string, string>) => TPayload;
  submit: (payload: TPayload) => Promise<{ data: unknown }>;
  transformResult?: (result: unknown) => unknown;
};

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === null || value === undefined) return "";
  return JSON.stringify(value);
}

function ResultValue({ value }: { value: unknown }) {
  if (Array.isArray(value)) {
    if (!value.length) {
      return <p className="text-sm text-muted-foreground">No items returned.</p>;
    }

    return (
      <div className="grid gap-2">
        {value.map((item, index) => (
          <div className="rounded-card border border-border bg-background/80 p-3 text-sm leading-6" key={`${formatValue(item)}-${index}`}>
            {typeof item === "object" && item !== null ? <ResultValue value={item} /> : formatValue(item)}
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="grid gap-3">
        {Object.entries(value).map(([key, item]) => (
          <section className="rounded-card border border-border bg-background/80 p-4" key={key}>
            <h3 className="mb-2 text-sm font-bold capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
            <ResultValue value={item} />
          </section>
        ))}
      </div>
    );
  }

  return <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{formatValue(value)}</p>;
}

export function toOptionalString(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function toStringArray(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AiEndpointPage<TPayload>({
  buildPayload,
  defaultValues,
  description,
  fields,
  icon: Icon,
  submit,
  submitLabel,
  transformResult,
  title,
}: AiEndpointPageProps<TPayload>) {
  const [values, setValues] = useState(defaultValues);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const missingRequired = useMemo(
    () => fields.filter((field) => field.required && !values[field.name]?.trim()).map((field) => field.label),
    [fields, values],
  );

  const updateValue = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (missingRequired.length) {
      setError(`Required: ${missingRequired.join(", ")}`);
      return;
    }

    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const response = await submit(buildPayload(values));
      setResult(transformResult ? transformResult(response.data) : response.data);
      toast.success(`${title} complete`);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "AI request failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader eyebrow="AI tools" title={title} description={description} />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <CardTitle>{submitLabel}</CardTitle>
                <CardDescription>Submit the fields required by the backend AI endpoint.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <label className="grid gap-2" key={field.name}>
                <span className="text-sm font-semibold">
                  {field.label}
                  {field.required ? <span className="text-danger"> *</span> : null}
                </span>
                {field.type === "textarea" ? (
                  <Textarea
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    value={values[field.name] ?? ""}
                  />
                ) : field.type === "select" ? (
                  <select
                    className="focus-ring h-11 w-full rounded-card border border-border bg-surface/80 px-3 text-sm shadow-sm"
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    value={values[field.name] ?? ""}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    min={field.type === "number" ? 1 : undefined}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    type={field.type ?? "text"}
                    value={values[field.name] ?? ""}
                  />
                )}
              </label>
            ))}
            {error ? (
              <div className="flex items-center gap-2 rounded-card border border-danger/30 bg-danger/10 px-3 py-2 text-sm font-semibold text-danger">
                <AlertTriangle className="size-4" />
                {error}
              </div>
            ) : null}
            <Button disabled={loading} type="submit">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              {submitLabel}
            </Button>
          </form>
        </Card>

        {loading ? (
          <Card className="grid min-h-80 place-items-center text-center">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="mt-3 text-sm font-semibold text-muted-foreground">Generating AI response...</p>
          </Card>
        ) : error ? (
          <ErrorState title={`${title} failed`} description={error} />
        ) : result ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>AI response</CardTitle>
                  <CardDescription>Backend response rendered from the endpoint result.</CardDescription>
                </div>
                <Badge variant="success">
                  <CheckCircle2 className="size-3.5" />
                  Complete
                </Badge>
              </div>
            </CardHeader>
            <ResultValue value={result} />
          </Card>
        ) : (
          <EmptyState title="No response yet" description="Submit the form to call this AI endpoint." />
        )}
      </div>
    </main>
  );
}
