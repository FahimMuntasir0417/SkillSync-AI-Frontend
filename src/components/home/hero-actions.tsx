"use client";

import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const messages = [
  "Plan a roadmap with AI",
  "Submit assignments for instructor review",
  "Track learning progress by course",
];

export function HeroActions() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % messages.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <div className="space-y-5">
      <div className="card flex items-center justify-between gap-4 p-3">
        <div>
          <p className="text-xs font-bold uppercase text-muted-foreground">Active workflow</p>
          <p className="mt-1 font-semibold">{messages[index]}</p>
        </div>
        <Button
          aria-label={playing ? "Pause hero animation" : "Play hero animation"}
          onClick={() => setPlaying((value) => !value)}
          size="icon"
          variant="outline"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild href="/courses" size="lg">
          Explore Courses
          <ArrowRight className="size-4" />
        </Button>
        <Button asChild href="/register" size="lg" variant="outline">
          Create Account
        </Button>
      </div>
    </div>
  );
}
