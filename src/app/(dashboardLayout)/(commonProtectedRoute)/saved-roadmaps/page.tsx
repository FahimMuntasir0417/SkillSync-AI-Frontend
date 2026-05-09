"use client";

import { CalendarDays, Filter, MoreHorizontal, Route, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";

const savedRoadmaps = [
  {
    title: "Frontend Engineer Career Track",
    timeline: "12 weeks",
    updatedAt: "Updated today",
    status: "In progress",
    progress: 64,
    focus: "React, TypeScript, Testing",
  },
  {
    title: "AI Product Builder Path",
    timeline: "16 weeks",
    updatedAt: "Updated yesterday",
    status: "Draft",
    progress: 28,
    focus: "Next.js, APIs, Product thinking",
  },
  {
    title: "Backend API Mastery",
    timeline: "10 weeks",
    updatedAt: "Updated 4 days ago",
    status: "Review",
    progress: 82,
    focus: "Node.js, Prisma, PostgreSQL",
  },
];

export default function SavedRoadmapsPage() {
  const [search, setSearch] = useState("");
  const visibleRoadmaps = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return savedRoadmaps;

    return savedRoadmaps.filter((roadmap) =>
      `${roadmap.title} ${roadmap.focus} ${roadmap.status}`.toLowerCase().includes(normalized),
    );
  }, [search]);

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="History"
        title="Saved Roadmaps"
        description="Review saved learning plans and continue from your most useful AI generations."
        actions={<Button asChild href="/roadmap-generator">Create roadmap</Button>}
      />
      <Card className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" onChange={(event) => setSearch(event.target.value)} placeholder="Search saved roadmaps..." value={search} />
        </div>
        <Button variant="outline">
          <Filter className="size-4" />
          Filter
        </Button>
      </Card>
      {visibleRoadmaps.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleRoadmaps.map((roadmap) => (
            <Card className="grid h-full gap-5" interactive key={roadmap.title}>
              <CardHeader className="mb-0 p-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Route className="size-6" />
                  </div>
                  <Badge variant={roadmap.status === "In progress" ? "success" : "neutral"}>{roadmap.status}</Badge>
                </div>
                <CardTitle>{roadmap.title}</CardTitle>
                <CardDescription>{roadmap.focus}</CardDescription>
              </CardHeader>
              <div>
                <div className="flex justify-between text-sm font-semibold">
                  <span>Progress</span>
                  <span className="text-primary">{roadmap.progress}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${roadmap.progress}%` }} />
                </div>
              </div>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-primary" />
                  {roadmap.timeline}
                </p>
                <p>{roadmap.updatedAt}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild href="/roadmap-generator" variant="outline">View</Button>
                <Button asChild href="/roadmap-generator">Continue</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No saved roadmaps" description="Generate and save a roadmap to build your learning history." />
      )}
      <Card className="flex items-center gap-3 text-sm text-muted-foreground">
        <MoreHorizontal className="size-4 text-primary" />
        Saved roadmap history is displayed locally because the current backend does not expose a roadmap-history endpoint.
      </Card>
    </main>
  );
}
