import { NextResponse } from "next/server";
import { getPratos } from "../../../actions/get-pratos";

export async function GET() {
  const data = await getPratos();

  return NextResponse.json({ data });
}
