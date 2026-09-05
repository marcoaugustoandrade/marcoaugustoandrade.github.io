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
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48 64x64" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
