import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Nushant Ghimire | AI Engineer & Software Developer",
  description: "Portfolio of Nushant Ghimire - AI Engineer and Full-Stack Developer specializing in LLMs, transformers, and modern web technologies.",
  keywords: ["AI Engineer", "Software Developer", "Full Stack", "LLM", "Machine Learning", "React", "Next.js", "FastAPI"],
  authors: [{ name: "Nushant Ghimire" }],
  openGraph: {
    title: "Nushant Ghimire | AI Engineer & Software Developer",
    description: "Portfolio of Nushant Ghimire - AI Engineer and Full-Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
