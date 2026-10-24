import type { Metadata } from "next";
import localFont from "next/font/local";
import { Questrial } from "next/font/google";
import ClickSparkle from "@/components/ClickSparkle";
import "./globals.css";

const blazhe = localFont({
  src: "./fonts/Blazhe.otf",
  variable: "--font-blazhe",
  display: "swap",
});

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-questrial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caitlin Box",
  description: "Solutions Engineer and Client Expert based in Orlando, FL.",
};

// Cursor files are plain URLs, so they need the site's base path (set in next.config.ts).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${blazhe.variable} ${questrial.variable}`}>
      <body>
        <style>{`
          html, body { cursor: url("${basePath}/cursors/wand.png") 10 8, auto; }
          a, button, [role="tab"], .strip, .slot { cursor: url("${basePath}/cursors/pointer.png") 24 14, pointer; }
        `}</style>
        {children}
        <ClickSparkle />
      </body>
    </html>
  );
}
