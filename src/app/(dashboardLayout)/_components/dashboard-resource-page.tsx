"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { getApiErrorMessage } from "@/lib/api-error";
import type { ApiResponse } from "@/lib/api/skillsync";

type QueryResult<T> = ApiResponse<T[]> | T[];

export type DashboardColumn<T> = {
  header: string;
  cell: (item: T) => ReactNode;
  className?: string;
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
};

function getRows<T>(result: QueryResult<T>): T[] {
  if (Array.isArray(result)) return result;
  return result.data;
}

export function DashboardResourcePage<T>({
  columns,
  description,
  emptyDescription = "There is no data to show for this workspace yet.",
  emptyTitle = "No records found",
  eyebrow,
  getRowKey,
  getSearchText,
  query,
  title,
}: DashboardResourcePageProps<T>) {
  const [search, setSearch] = useState("");

  const { data = [], error, isFetching, refetch } = useQuery({
    queryKey: ["dashboard-resource", title],
    queryFn: async () => getRows(await query()),
  });

  const visibleRows = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return data;

    return data.filter((row) => getSearchText(row).toLowerCase().includes(normalized));
  }, [data, getSearchText, search]);

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <Button disabled={isFetching} onClick={() => void refetch()} variant="outline">
            <RefreshCcw className="size-4" />
            Refresh
          </Button>
        }
      />

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {isFetching ? "Loading live backend data..." : `${visibleRows.length} of ${data.length} records shown`}
            </CardDescription>
          </div>
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" onChange={(event) => setSearch(event.target.value)} placeholder="Search records..." value={search} />
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
                      </tr>
                    ))
                  : visibleRows.map((row, index) => (
                      <tr className="border-t border-border align-top" key={getRowKey(row, index)}>
                        {columns.map((column) => (
                          <td className={column.className ?? "p-4"} key={column.header}>
                            {column.cell(row)}
                          </td>
                        ))}
                      </tr>
                    ))}
              </tbody>
            </table>
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
