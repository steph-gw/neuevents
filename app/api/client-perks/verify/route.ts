import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let password = "";

  try {
    const body = (await request.json()) as { password?: string };
    password = body.password?.trim() ?? "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expected = process.env.CLIENT_PERKS_PASSWORD ?? "neuclient26";

  if (password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
