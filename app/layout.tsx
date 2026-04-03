import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Sora } from "next/font/google";
import "@/app/globals.css";

const heading = Sora({
  subsets: ["latin"],
  variable: "--font-heading"
});

const body = IBM_Plex_Sans_Thai({
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
      </body>
    </html>
  );
}
