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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${blazhe.variable} ${questrial.variable}`}>
      <body>
        {children}
        <ClickSparkle />
      </body>
    </html>
  );
}
