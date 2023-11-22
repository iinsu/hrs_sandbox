import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")!) || 0;
  const pageSize = 10;
  const projects = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      const id = page * pageSize + (i + 1);
      return {
        name: "Project " + id,
        id,
      };
    });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json({ projects, hasMore: page < 9 });
}
