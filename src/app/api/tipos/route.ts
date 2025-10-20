import { NextResponse } from "next/server";
import { getTipos } from "../../../actions/get-tipos";

export async function GET() {
  const data = await getTipos();

  return NextResponse.json({ data });
}
