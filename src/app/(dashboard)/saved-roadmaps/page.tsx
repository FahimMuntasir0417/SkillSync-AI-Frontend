import { CalendarDays, FolderClock, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";

const savedRoadmaps = [
  {
    title: "Frontend Engineer Career Track",
    timeline: "12 weeks",
    updatedAt: "Ready to connect API history",
    status: "Draft",
  },
  {
    title: "AI Product Builder Path",
    timeline: "16 weeks",
    updatedAt: "Ready to connect API history",
    status: "Draft",
  },
];

export default function SavedRoadmapsPage() {
  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="History"
        title="Saved Roadmaps"
        description="Review saved learning plans and continue from your most useful AI generations."
      />
      {savedRoadmaps.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {savedRoadmaps.map((roadmap) => (
            <Card className="grid h-full gap-5" key={roadmap.title}>
              <CardHeader className="mb-0">
                <Route className="size-8 text-primary" />
                <CardTitle>{roadmap.title}</CardTitle>
                <CardDescription>{roadmap.status}</CardDescription>
              </CardHeader>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-primary" />
                  {roadmap.timeline}
                </p>
                <p className="flex items-center gap-2">
                  <FolderClock className="size-4 text-primary" />
                  {roadmap.updatedAt}
                </p>
              </div>
              <Button asChild href="/roadmap-generator" variant="outline">
                Open generator
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No saved roadmaps" description="Generate and save a roadmap to build your learning history." />
      )}
    </main>
  );
}
