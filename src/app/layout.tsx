import type { Metadata } from "next";
import "./globals.css";
import Background from "./components/background/background";
import Jukebox from "./components/jukebox/jukebox";
import { TimeProvider } from "@/contexts/time-context";

export const metadata: Metadata = {
  title: "착취의 들판, 프롤레타리아 농장",
  description: "누구든지 아침엔 농장을 돌보아야 해.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <TimeProvider>
          <Jukebox />
          <Background>{children}</Background>
        </TimeProvider>
      </body>
    </html>
  );
}
