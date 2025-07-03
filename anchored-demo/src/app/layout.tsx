import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anchored Demo",
  description: "Live Experience Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
