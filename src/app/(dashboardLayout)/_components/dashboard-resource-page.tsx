"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, RefreshCcw, Search, Trash2, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Textarea } from "@/components/ui/textarea";
import { getApiErrorMessage } from "@/lib/api-error";
import type { ApiResponse } from "@/lib/api/skillsync";

type QueryResult<T> = ApiResponse<T[]> | T[];

export type DashboardColumn<T> = {
  header: string;
  cell: (item: T) => ReactNode;
  className?: string;
};

export type DashboardField<T> = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select" | "checkbox" | "datetime-local" | "tags";
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  getValue?: (item: T) => string | number | boolean | string[] | null | undefined;
};

export type DashboardPayload = Record<string, string | number | boolean | string[]>;

export type DashboardCrudAction<T> = {
  label: string;
  fields: DashboardField<T>[];
  submitLabel?: string;
  mutation: (payload: DashboardPayload, item?: T) => Promise<unknown>;
};

export type DashboardRowAction<T> = {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "soft";
  confirm?: string;
  run: (item: T) => Promise<unknown>;
  isVisible?: (item: T) => boolean;
};

type DashboardResourcePageProps<T> = {
  eyebrow: string;
  title: string;
  description: string;
  query: () => Promise<QueryResult<T>>;
  columns: DashboardColumn<T>[];
  getSearchText: (item: T) => string;
  getRowKey: (item: T, index: number) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  createAction?: DashboardCrudAction<T>;
  updateAction?: DashboardCrudAction<T>;
  deleteAction?: (item: T) => Promise<unknown>;
  rowActions?: DashboardRowAction<T>[];
};

const dashboardPageSize = 5;

function getRows<T>(result: QueryResult<T>): T[] {
  if (Array.isArray(result)) return result;
  return result.data;
}

function fieldToValue<T>(field: DashboardField<T>, item?: T) {
  if (!item || !field.getValue) return field.type === "checkbox" ? false : "";

  const value = field.getValue(item);

  if (field.type === "datetime-local" && typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString().slice(0, 16);
    }
  }

  if (field.type === "tags" && Array.isArray(value)) {
    return value.join(", ");
  }

  return value ?? (field.type === "checkbox" ? false : "");
}

function formToPayload<T>(formData: FormData, fields: DashboardField<T>[]): DashboardPayload {
  return fields.reduce<DashboardPayload>((payload, field) => {
    if (field.type === "checkbox") {
      payload[field.name] = formData.get(field.name) === "on";
      return payload;
    }

    const rawValue = String(formData.get(field.name) ?? "").trim();

    if (!rawValue && !field.required) {
      return payload;
    }

    if (field.type === "number") {
      payload[field.name] = Number(rawValue);
      return payload;
    }

    if (field.type === "tags") {
      payload[field.name] = rawValue
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      return payload;
    }

    payload[field.name] = rawValue;
    return payload;
  }, {});
}

export function DashboardResourcePage<T>({
  columns,
  createAction,
  deleteAction,
  description,
  emptyDescription = "There is no data to show for this workspace yet.",
  emptyTitle = "No records found",
  eyebrow,
  getRowKey,
  getSearchText,
  query,
  rowActions = [],
  title,
  updateAction,
}: DashboardResourcePageProps<T>) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);
  const queryKey = useMemo(() => ["dashboard-resource", eyebrow, title], [eyebrow, title]);

  const { data = [], error, isFetching, refetch } = useQuery({
    queryKey,
    queryFn: async () => getRows(await query()),
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  const createMutation = useMutation({
    mutationFn: (payload: DashboardPayload) => createAction?.mutation(payload) ?? Promise.resolve(),
    onSuccess: async () => {
      toast.success("Created successfully");
      setCreating(false);
      await refresh();
    },
    onError: (mutationError) => toast.error(getApiErrorMessage(mutationError)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ payload, item }: { payload: DashboardPayload; item: T }) =>
      updateAction?.mutation(payload, item) ?? Promise.resolve(),
    onSuccess: async () => {
      toast.success("Updated successfully");
      setEditing(null);
      await refresh();
    },
    onError: (mutationError) => toast.error(getApiErrorMessage(mutationError)),
  });

  const deleteMutation = useMutation({
    mutationFn: (item: T) => deleteAction?.(item) ?? Promise.resolve(),
    onSuccess: async () => {
      toast.success("Deleted successfully");
      await refresh();
    },
    onError: (mutationError) => toast.error(getApiErrorMessage(mutationError)),
  });

  const rowActionMutation = useMutation({
    mutationFn: ({ action, item }: { action: DashboardRowAction<T>; item: T }) => action.run(item),
    onSuccess: async () => {
      toast.success("Action completed");
      await refresh();
    },
    onError: (mutationError) => toast.error(getApiErrorMessage(mutationError)),
  });

  const visibleRows = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return data;

    return data.filter((row) => getSearchText(row).toLowerCase().includes(normalized));
  }, [data, getSearchText, search]);

  const totalPages = Math.max(1, Math.ceil(visibleRows.length / dashboardPageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * dashboardPageSize;
  const paginatedRows = visibleRows.slice(startIndex, startIndex + dashboardPageSize);
  const shownStart = visibleRows.length === 0 ? 0 : startIndex + 1;
  const shownEnd = Math.min(startIndex + dashboardPageSize, visibleRows.length);

  const activeForm = creating ? createAction : editing ? updateAction : undefined;
  const activeItem = editing ?? undefined;
  const actionColumns = Number(Boolean(updateAction)) + Number(Boolean(deleteAction)) + Number(rowActions.length > 0);

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <div className="flex flex-wrap gap-2">
            {createAction ? (
              <Button onClick={() => setCreating(true)}>
                <Plus className="size-4" />
                {createAction.label}
              </Button>
            ) : null}
            <Button disabled={isFetching} onClick={() => void refetch()} variant="outline">
              <RefreshCcw className="size-4" />
              Refresh
            </Button>
          </div>
        }
      />

      {activeForm ? (
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>{activeForm.label}</CardTitle>
              <CardDescription>Submit the fields required by the backend validation schema.</CardDescription>
            </div>
            <Button
              aria-label="Close form"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
              size="icon"
              variant="ghost"
            >
              <X className="size-4" />
            </Button>
          </CardHeader>
          <div>
            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                const payload = formToPayload(new FormData(event.currentTarget), activeForm.fields);

                if (editing) {
                  updateMutation.mutate({ payload, item: editing });
                } else {
                  createMutation.mutate(payload);
                }
              }}
            >
              {activeForm.fields.map((field) => (
                <label className={field.type === "textarea" ? "grid gap-2 md:col-span-2" : "grid gap-2"} key={field.name}>
                  <span className="text-sm font-semibold text-foreground">{field.label}</span>
                  {field.type === "textarea" ? (
                    <Textarea
                      defaultValue={String(fieldToValue(field, activeItem))}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  ) : field.type === "select" ? (
                    <select
                      className="focus-ring h-11 w-full rounded-card border border-border bg-surface/80 px-3 text-sm text-foreground shadow-sm transition"
                      defaultValue={String(fieldToValue(field, activeItem))}
                      name={field.name}
                      required={field.required}
                    >
                      <option value="">Select {field.label.toLowerCase()}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <input
                      className="size-5 rounded border-border accent-primary"
                      defaultChecked={Boolean(fieldToValue(field, activeItem))}
                      name={field.name}
                      type="checkbox"
                    />
                  ) : (
                    <Input
                      defaultValue={String(fieldToValue(field, activeItem))}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      type={field.type === "datetime-local" ? "datetime-local" : field.type === "number" ? "number" : "text"}
                    />
                  )}
                </label>
              ))}
              <div className="flex flex-wrap gap-2 md:col-span-2">
                <Button disabled={createMutation.isPending || updateMutation.isPending} type="submit">
                  {activeForm.submitLabel ?? "Save"}
                </Button>
                <Button
                  onClick={() => {
                    setCreating(false);
                    setEditing(null);
                  }}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {isFetching
                ? "Loading live backend data..."
                : `${shownStart}-${shownEnd} of ${visibleRows.length} records shown`}
            </CardDescription>
          </div>
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search records..."
              value={search}
            />
          </div>
        </CardHeader>

        {error ? <ErrorState title="Data unavailable" description={getApiErrorMessage(error)} /> : null}

        {!error && !isFetching && visibleRows.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : null}

        {!error && (isFetching || visibleRows.length > 0) ? (
          <div className="overflow-x-auto rounded-card border border-border">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  {columns.map((column) => (
                    <th className={column.className ?? "p-4"} key={column.header}>
                      {column.header}
                    </th>
                  ))}
                  {actionColumns > 0 ? <th className="p-4">Actions</th> : null}
                </tr>
              </thead>
              <tbody>
                {isFetching
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <tr className="border-t border-border" key={index}>
                        {columns.map((column) => (
                          <td className={column.className ?? "p-4"} key={column.header}>
                            <span className="block h-4 w-28 animate-pulse rounded bg-muted" />
                          </td>
                        ))}
                        {actionColumns > 0 ? (
                          <td className="p-4">
                            <span className="block h-9 w-32 animate-pulse rounded bg-muted" />
                          </td>
                        ) : null}
                      </tr>
                    ))
                  : paginatedRows.map((row, index) => (
                      <tr className="border-t border-border align-top" key={getRowKey(row, index)}>
                        {columns.map((column) => (
                          <td className={column.className ?? "p-4"} key={column.header}>
                            {column.cell(row)}
                          </td>
                        ))}
                        {actionColumns > 0 ? (
                          <td className="p-4">
                            <div className="flex flex-wrap gap-2">
                              {rowActions
                                .filter((action) => action.isVisible?.(row) ?? true)
                                .map((action) => (
                                  <Button
                                    disabled={rowActionMutation.isPending}
                                    key={action.label}
                                    onClick={() => {
                                      if (action.confirm && !window.confirm(action.confirm)) return;
                                      rowActionMutation.mutate({ action, item: row });
                                    }}
                                    size="sm"
                                    variant={action.variant ?? "outline"}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              {updateAction ? (
                                <Button onClick={() => setEditing(row)} size="sm" variant="outline">
                                  <Pencil className="size-4" />
                                  Edit
                                </Button>
                              ) : null}
                              {deleteAction ? (
                                <Button
                                  disabled={deleteMutation.isPending}
                                  onClick={() => {
                                    if (window.confirm("Delete this record?")) {
                                      deleteMutation.mutate(row);
                                    }
                                  }}
                                  size="sm"
                                  variant="danger"
                                >
                                  <Trash2 className="size-4" />
                                  Delete
                                </Button>
                              ) : null}
                            </div>
                          </td>
                        ) : null}
                      </tr>
                  ))}
              </tbody>
            </table>
            {!isFetching && visibleRows.length > dashboardPageSize ? (
              <div className="flex flex-col gap-3 border-t border-border bg-surface/70 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Page {currentPage} of {totalPages} - Showing {shownStart}-{shownEnd} of {visibleRows.length}
                </span>
                <div className="flex gap-2">
                  <Button
                    disabled={currentPage === 1}
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                    size="sm"
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                    size="sm"
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Card>
    </main>
  );
}

export function TextCell({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children || "Not set"}</span>;
}

export function MutedCell({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children || "Not set"}</span>;
}

export function StatusBadge({ children }: { children: ReactNode }) {
  const value = String(children ?? "").toLowerCase();
  const variant =
    value.includes("active") || value.includes("published") || value.includes("approved") || value.includes("success")
      ? "success"
      : value.includes("pending") || value.includes("draft") || value.includes("review") || value.includes("progress")
        ? "warning"
        : value.includes("blocked") || value.includes("rejected") || value.includes("closed")
          ? "danger"
          : "neutral";

  return <Badge variant={variant}>{children || "Unknown"}</Badge>;
}
