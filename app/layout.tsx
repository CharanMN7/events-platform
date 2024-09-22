import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Events Platform",
  description: "The coolest events platform ever!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
