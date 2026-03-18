import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Looking for a Co-founder — Andrea",
  description:
    "A 21-year-old from Italy building something meaningful. Looking for a co-founder, a friend, a team.",
  openGraph: {
    title: "Looking for a Co-founder",
    description:
      "A 21-year-old from Italy building something meaningful. Looking for a co-founder, a friend, a team.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
