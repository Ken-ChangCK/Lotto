import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '扭蛋机 - Gashapon',
  description: '互动式 3D 扭蛋机应用',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
