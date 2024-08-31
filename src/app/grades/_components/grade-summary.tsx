import { Badge, BadgeProps } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subject } from "@/types/subjects";

interface GradeSummaryProps {
  subjects: Subject[];
  grades: Record<string, Record<string, number>>;
}

export function GradeSummary({ subjects, grades }: GradeSummaryProps) {
  const calculateSubjectGrade = (subject: Subject) => {
    const subjectGrades = grades[subject.code] || {};

    const examGrade = subject.exams.reduce((total, exam) => {
      return total + (subjectGrades[exam.name] || 0) * exam.weight;
    }, 0);

    const assignmentGrade = subject.assignments.reduce((total, assignment) => {
      return total + (subjectGrades[assignment.name] || 0) * assignment.weight;
    }, 0);

    return (
      (examGrade * subject.examWeight) / 100 +
      (assignmentGrade * subject.assignmentWeight) / 100
    );
  };

  return (
    <Card className="rounded-b-none">
      <CardHeader>
        <CardTitle>Visão geral</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {subjects.map((subject) => {
          const subjectGrade = calculateSubjectGrade(subject);

          const badgeVariant: BadgeProps["variant"] =
            subjectGrade >= 6
              ? "success"
              : subjectGrade >= 5
              ? "warning"
              : "danger";
          return (
            <div
              key={subject.code}
              className="flex justify-between items-center"
            >
              <span>
                {subject.name} ({subject.code})
              </span>

              <Badge variant={badgeVariant}>
                {calculateSubjectGrade(subject).toFixed(2)}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
