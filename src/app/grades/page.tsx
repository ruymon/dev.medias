"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import { Fragment, useRef } from "react";
import { GradeSummary } from "./_components/grade-summary";
import { SubjectGradesInputCard } from "./_components/subject-grades-input-card";

export default function GradesPage() {
  const { subscribedSubjects } = useSubscribedSubjectsStore();
  const { grades, setGrades } = useSubscribedSubjectsGradesStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGradeChange = (
    subjectCode: string,
    examOrAssignment: string,
    grade: number
  ) => {
    const updatedGrades = {
      ...grades,
      [subjectCode]: {
        ...grades[subjectCode],
        [examOrAssignment]: grade,
      },
    };
    setGrades(updatedGrades);
  };

  const handleClearGrades = () => {
    setGrades({});
  };

  const handleExportGrades = async () => {
    const gradesData = JSON.stringify(grades, null, 2);
    const blob = new Blob([gradesData], { type: "application/json" });

    if ("showSaveFilePicker" in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: "grades.json",
          types: [
            {
              description: "JSON File",
              accept: { "application/json": [".json"] },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (err) {
        console.error("Failed to save file:", err);
      }
    } else {
      // Fallback for browsers that don't support the File System Access API
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "grades.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleImportGrades = async () => {
    if ("showOpenFilePicker" in window) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [
            {
              description: "JSON File",
              accept: { "application/json": [".json"] },
            },
          ],
        });
        const file = await handle.getFile();
        const content = await file.text();
        const importedGrades = JSON.parse(content);
        setGrades(importedGrades);
      } catch (err) {
        console.error("Failed to open file:", err);
      }
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const importedGrades = JSON.parse(content);
        setGrades(importedGrades);
      };
      reader.readAsText(file);
    }
  };

  return (
    <main className="flex py-8 px-6 max-w-5xl mx-auto w-full gap-16">
      <aside className="flex flex-col max-w-[30%]">
        {Object.keys(subscribedSubjects).length > 0 && (
          <>
            <GradeSummary
              subscribedSubjects={subscribedSubjects}
              grades={grades}
            />
            <Button
              onClick={handleClearGrades}
              variant="outline"
              size="lg"
              className="rounded-none"
            >
              Limpar valores
            </Button>
            <Button
              onClick={handleExportGrades}
              className="rounded-none"
              variant="outline"
              size="lg"
            >
              Exportar notas
            </Button>
            <Button
              onClick={handleImportGrades}
              variant="outline"
              className="rounded-t-none"
              size="lg"
            >
              Importar notas
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept=".json"
              className="hidden"
            />
          </>
        )}
      </aside>

      <ul className="flex flex-col flex-1 gap-2">
        {Object.values(subscribedSubjects).map((subject) => (
          <Fragment key={subject.code}>
            <SubjectGradesInputCard
              subject={subject}
              grades={grades[subject.code] || {}}
              onGradeChange={(examOrAssignment, grade) =>
                handleGradeChange(subject.code, examOrAssignment, grade)
              }
            />
            <Separator className="bg-muted" />
          </Fragment>
        ))}

        {Object.keys(subscribedSubjects).length === 0 && (
          <span className="text-center text-muted-foreground">
            Você não tem nenhuma matéria inscrita ainda... Adicione matérias
            para começar a adicionar notas!
          </span>
        )}
      </ul>
    </main>
  );
}
