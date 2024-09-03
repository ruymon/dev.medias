interface HighlightTextProps {
  text: string;
  searchTerm?: string;
}

export function HighlightText({ text, searchTerm }: HighlightTextProps) {
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
}
