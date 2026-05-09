import { apiClient } from "@/lib/api-client";
import type { RoadmapInput } from "../schemas/roadmap.schema";

const savedRoadmapsStorageKey = "skillsync_saved_roadmaps";

export type RoadmapResult = {
  title?: string;
  durationWeeks?: number;
  summary?: string;
  phases?: Array<{
    title?: string;
    phaseTitle?: string;
    duration?: string;
    weekRange?: string;
    skills?: string[];
    topics?: string[];
    tasks?: string[];
    resources?: string[];
    projects?: string[];
    milestones?: string[];
    outcome?: string;
  }>;
  skillsToLearn?: string[];
  projectsToBuild?: string[];
  timeline?: string;
  [key: string]: unknown;
};

export type SavedRoadmap = {
  id: string;
  title: string;
  timeline: string;
  updatedAt: string;
  status: "Draft" | "In progress" | "Review";
  progress: number;
  focus: string;
  roadmap: RoadmapResult;
};

type RoadmapResponse = {
  success: boolean;
  message: string;
  data: RoadmapResult;
};

export async function generateRoadmap(payload: RoadmapInput) {
  const response = await apiClient.post<RoadmapResponse>("/ai/roadmap", {
    goal: payload.targetRole,
    level: payload.currentLevel,
    weeklyHours: payload.weeklyStudyHours,
  });

  return response.data.data;
}

function getRoadmapTimeline(roadmap: RoadmapResult) {
  if (roadmap.durationWeeks) {
    return `${roadmap.durationWeeks} weeks`;
  }

  return roadmap.timeline ?? "Timeline returned by AI";
}

function getRoadmapFocus(roadmap: RoadmapResult) {
  const focusItems =
    roadmap.skillsToLearn ??
    roadmap.phases?.flatMap((phase) => phase.topics ?? phase.skills ?? []).slice(0, 4) ??
    [];

  return focusItems.length ? focusItems.join(", ") : "AI-generated learning roadmap";
}

export function getSavedRoadmaps() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(savedRoadmapsStorageKey);
    return stored ? (JSON.parse(stored) as SavedRoadmap[]) : [];
  } catch {
    return [];
  }
}

export function saveRoadmapLocally(roadmap: RoadmapResult) {
  if (typeof window === "undefined") {
    throw new Error("Roadmap saving is only available in the browser");
  }

  const savedRoadmap: SavedRoadmap = {
    id: crypto.randomUUID(),
    title: roadmap.title ?? "Generated roadmap",
    timeline: getRoadmapTimeline(roadmap),
    updatedAt: new Date().toISOString(),
    status: "Draft",
    progress: 0,
    focus: getRoadmapFocus(roadmap),
    roadmap,
  };

  const existing = getSavedRoadmaps();
  window.localStorage.setItem(savedRoadmapsStorageKey, JSON.stringify([savedRoadmap, ...existing]));

  return savedRoadmap;
}
