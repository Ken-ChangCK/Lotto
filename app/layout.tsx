import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "扭蛋機 - Gashapon",
  description: "基於 Three.js 打造的精美 3D 扭蛋機",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
