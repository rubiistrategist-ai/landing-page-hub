import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HubTask Brasil | Mini Curso e Comunidade Exclusiva",
  description: "Aprenda o passo a passo completo da HubTask, tenha acesso ao mini curso gratuito e entre na maior comunidade brasileira sobre a plataforma.",
  keywords: ["HubTask", "HubTask Brasil", "mini curso hubtask", "comunidade hubtask", "afiliado hubtask"],
  openGraph: {
    title: "HubTask Brasil | Mini Curso Gratuito",
    description: "Tenha acesso ao mini curso e à comunidade exclusiva. Treinamento para novos usuários.",
    url: "https://sua-url-da-vercel.app", // Atualize com seu link da Vercel depois
    siteName: "HubTask Brasil",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "HubTask Brasil",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HubTask Brasil | Mini Curso Gratuito",
    description: "Tenha acesso ao mini curso e à comunidade exclusiva.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}