import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doutor Minhoca | Húmus e minhocas",
  description: "Húmus e matrizes de minhocas. Enviamos para todo o Brasil.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
