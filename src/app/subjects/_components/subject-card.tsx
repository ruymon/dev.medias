"use client";

import { Subject } from "@/types/subjects";
import { useSearchParams } from "next/navigation";

interface SubjectCardProps extends Subject {}

export function SubjectCard(subject: SubjectCardProps) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase();

  const highlightText = (text: string) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-600/40">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <li className="flex flex-col gap-3 rounded-lg p-4 bg-background hover:bg-muted/50 transition-all duration-75">
      <div className="flex flex-col">
        <span className="text-muted-foreground text-sm">
          {highlightText(subject.code)}
        </span>
        <span className="text-secondary-foreground text-xl font-bold">
          {highlightText(subject.name)}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs font-medium rounded-full px-2 py-0.5 bg-muted text-muted-foreground">
          {subject.course}
        </span>

        {/* <div className="flex flex-wrap gap-2 mt-1">
          {subject.courses &&
            Object.entries(subject.courses).map(([course, weight]) => (
              <span
                key={course}
                className="text-xs font-medium rounded-full px-2 py-0.5 bg-muted text-muted-foreground"
              >
                {course} ({weight})
              </span>
            ))}
        </div> */}
      </div>
    </li>
  );
}
