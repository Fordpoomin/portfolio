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
        {/* Scroll to top button */}
        <a
          href="#home"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-lg transition hover:bg-amber-300 focus:outline-none"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </a>
      </body>
    </html>
  );
}
