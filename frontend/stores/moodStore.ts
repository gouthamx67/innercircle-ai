import { create } from "zustand";

type MoodEntry = {
  id: number;
  mood: string;
  score: number;
  createdAt: string;
};

type MoodState = {
  currentMood: string | null;
  moodHistory: MoodEntry[];
  setCurrentMood: (mood: string | null) => void;
  setMoodHistory: (history: MoodEntry[]) => void;
  addMoodEntry: (entry: MoodEntry) => void;
};

export const useMoodStore = create<MoodState>((set) => ({
  currentMood: null,
  moodHistory: [],
  setCurrentMood: (mood) => set({ currentMood: mood }),
  setMoodHistory: (history) => set({ moodHistory: history }),
  addMoodEntry: (entry) =>
    set((state) => ({
      moodHistory: [entry, ...state.moodHistory],
      currentMood: entry.mood,
    })),
}));
