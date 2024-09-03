interface CoursesResponse {
  [key: string]: string;
}

export async function getCoursesNames(): Promise<CoursesResponse> {
  const url = "https://d2aa4b9d9pswiy.cloudfront.net/courses.json";

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 60 * 24 * 7, // 1 week in seconds
      tags: ["courses-names"],
    },
  };

  const result = await fetch(url, options);
  const data = await result.json();

  if (!result.ok) {
    throw new Error("Error fetching courses names:", data);
  }

  return data;
}
