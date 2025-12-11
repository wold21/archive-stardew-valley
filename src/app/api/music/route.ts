import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dayMusicPath = path.join(process.cwd(), "public/assets/music/day");
  const nightMusicPath = path.join(process.cwd(), "public/assets/music/night");

  const dayMusic = fs
    .readdirSync(dayMusicPath)
    .filter((file) => file.endsWith(".mp3"));
  const nightMusic = fs
    .readdirSync(nightMusicPath)
    .filter((file) => file.endsWith(".mp3"));

  return NextResponse.json({ dayMusic, nightMusic });
}
