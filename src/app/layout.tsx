import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitTrainer",
  description: "Personal trainer client management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
