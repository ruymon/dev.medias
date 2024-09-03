import { Badge, BadgeProps } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateSubjectGrade } from "@/lib/grades";
import { Grades } from "@/types/grades";
import { Subjects } from "@/types/subjects";

interface GradeSummaryProps {
  subscribedSubjects: Subjects;
  grades: Grades;
}

export function GradeSummary({
  subscribedSubjects,
  grades,
}: GradeSummaryProps) {
  const subjects = Object.values(subscribedSubjects);

  return (
    <Card className="rounded-b-none">
      <CardHeader>
        <CardTitle>Visão geral</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {subjects.map((subject) => {
          const subjectGrade = calculateSubjectGrade(
            subject,
            grades[subject.code]
          );

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

              <Badge variant={badgeVariant}>{subjectGrade.toFixed(2)}</Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
