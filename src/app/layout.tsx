import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "MVU AI LAB | MaenVaerU",
  description: "Профессиональная ретушь, апскейл, установка и воркфлоу ComfyUI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <meta name="theme-color" content="#121212" />
      </head>
      <body className={cn(inter.className, "antialiased min-h-screen bg-background text-foreground flex flex-col")}>
        <header className="sticky top-0 z-50 w-full border-b border-white/10 glass relative overflow-hidden">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Icon with extra contrast and smoothness */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(0,239,255,0.2)]">
                <Image
                  src="/images/avatar.jpg"
                  alt="Logo"
                  width={32}
                  height={32}
                  quality={100}
                  className="object-cover rounded-full"
                  priority
                />
              </div>
              <div className="text-xl font-bold tracking-tighter text-cyan drop-shadow-[0_0_8px_rgba(0,239,255,0.8)]">
                MVU AI LAB
              </div>
            </div>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <a href="#services" className="hover:text-cyan transition-colors">Услуги</a>
              <a href="#workflows" className="hover:text-cyan transition-colors">Воркфлоу</a>
              <a href="#subscriptions" className="hover:text-cyan transition-colors">Тарифы</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-white/10 mt-auto py-8">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} MVU AI LAB / MaenVaerU. Все права защищены.
          </div>
        </footer>
      </body>
    </html>
  );
}
