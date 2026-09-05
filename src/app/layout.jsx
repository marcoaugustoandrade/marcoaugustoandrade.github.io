import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

const description =
  "Professor EBTT no IFRO Campus Vilhena. Engenharia de Software, Programação e Sistemas de Informação.";

export const metadata = {
  title: "Marco Andrade",
  description,
  openGraph: {
    title: "Marco Andrade",
    description,
    type: "profile",
    locale: "pt_BR",
    images: [{ url: "/marco.png", width: 544, height: 544, alt: "Foto de Marco Andrade" }],
  },
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
