import { Grades } from "@/types/grades";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SubscribedSubjectsGradesStore {
  grades: Grades;
  setGrades: (grades: Grades) => void;
}

export const useSubscribedSubjectsGradesStore = create(
  persist<SubscribedSubjectsGradesStore>(
    (set) => ({
      grades: {},
      setGrades: (grades) => set({ grades }),
    }),
    {
      name: "subscribed-subjects-grades-store",
    }
  )
);
