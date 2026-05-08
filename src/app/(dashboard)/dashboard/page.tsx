import { Bot, FolderClock, Route, Target, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

const quickActions = [
  { href: "/roadmap-generator", label: "Generate Roadmap", icon: Route },
  { href: "/skill-gap-analyzer", label: "Analyze Skill Gap", icon: Target },
  { href: "/project-recommender", label: "Find Projects", icon: WandSparkles },
  { href: "/ai-chat", label: "Chat with AI", icon: Bot },
];

export default function DashboardPage() {
  return (
    <main className="p-4 md:p-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Welcome to SkillSync AI"
        description="Use AI tools to plan your learning path, analyze gaps, choose portfolio projects, and get study support."
      />
      <div className="grid gap-5 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Card className="grid gap-4" key={action.href}>
            <action.icon className="size-8 text-primary" />
            <CardTitle>{action.label}</CardTitle>
            <Button asChild href={action.href} variant="outline">
              Open
            </Button>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent AI generations</CardTitle>
            <CardDescription>Generated roadmaps and recommendations will appear here.</CardDescription>
          </CardHeader>
          <div className="rounded-card bg-muted p-4 text-sm text-muted-foreground">
            No recent generations yet.
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Progress overview</CardTitle>
            <CardDescription>Track your learning progress and saved plans.</CardDescription>
          </CardHeader>
          <div className="flex items-center gap-3 rounded-card bg-muted p-4 text-sm text-muted-foreground">
            <FolderClock className="size-5 text-primary" />
            Saved roadmap tracking is ready for Phase 5.
          </div>
        </Card>
      </div>
    </main>
  );
}
