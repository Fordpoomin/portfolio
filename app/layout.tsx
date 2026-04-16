import type { Metadata } from "next";
import { Kanit, Noto_Sans_Thai } from "next/font/google";
import "@/app/globals.css";
import { ScrollTopLink } from "@/components/scroll-top-link";

const heading = Kanit({
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading"
});

const body = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Poomin Wan-arome | Portfolio",
  description: "Modern portfolio and admin dashboard built with Next.js 15, Tailwind, Prisma, and MySQL."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${heading.variable} ${body.variable} font-[var(--font-body)]`}
      >
        {children}
        <ScrollTopLink />
      </body>
    </html>
  );
}
