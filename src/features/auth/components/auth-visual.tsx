import { BrainCircuit, ChartNoAxesColumnIncreasing, FolderClock, Route, Sparkles, WandSparkles } from "lucide-react";

const benefits = [
  { icon: Route, title: "Personalized roadmaps", text: "Turn career goals into practical weekly learning plans." },
  { icon: WandSparkles, title: "AI project recommendations", text: "Build projects that match your role, level, and stack." },
  { icon: BrainCircuit, title: "Skill gap analysis", text: "See what you already know and what matters next." },
  { icon: ChartNoAxesColumnIncreasing, title: "Learning dashboard", text: "Track progress and keep useful AI outputs organized." },
];

export function AuthVisual() {
  return (
    <section className="relative hidden min-h-[720px] overflow-hidden rounded-[28px] border border-border bg-primary p-8 text-primary-foreground shadow-soft lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(255_255_255_/_0.24),transparent_30rem)]" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold">
          <Sparkles className="size-4" />
          AI learning workspace
        </div>
        <h2 className="mt-6 max-w-md text-4xl font-bold leading-tight tracking-tight">
          Build a clearer path from skill gaps to career-ready projects.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-6 opacity-85">
          SkillSync AI combines structured planning, recommendations, and chat guidance inside a polished dashboard.
        </p>
      </div>
      <div className="relative mt-10 grid gap-4">
        {benefits.map((benefit) => (
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur" key={benefit.title}>
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15">
                <benefit.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-bold">{benefit.title}</h3>
                <p className="mt-1 text-sm leading-6 opacity-80">{benefit.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>Roadmap completion</span>
          <span>72%</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/20">
          <div className="h-2 w-[72%] rounded-full bg-white" />
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm opacity-85">
          <FolderClock className="size-4" />
          Saved learning history ready
        </div>
      </div>
    </section>
  );
}
