import { NextResponse } from "next/server";

let list = ["Item 1", "Item 2", "Item 3"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const addItem = searchParams.get("add");
  const clear = searchParams.get("clear");

  if (addItem !== null) {
    if (!list.includes(addItem)) {
      list.push(addItem);
    }
  } else if (clear === "true") {
    list = [];
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  return NextResponse.json(list);
}
