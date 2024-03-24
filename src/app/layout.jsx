import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Marco Andrade",
  description: "Marco Andrade",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon.png',
        href: '/favicon.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon.png',
        href: '/favicon.png',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
