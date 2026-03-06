"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { getAssetPath } from "@/lib/utils";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("ru");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isCms = pathname?.includes("/outstatic") || pathname?.includes("/admin");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false); // Close menu on click
      }
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const toggleLang = () => {
    setLang(lang === "ru" ? "en" : "ru");
  };

  if (isCms) {
    return (
      <html lang="en">
        <body className="bg-[#0a0a0a] antialiased min-h-screen text-white">
          {children}
        </body>
      </html>
    );
  }
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#121212" />
      </head>
      <body className={cn(inter.className, "antialiased min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <header className="sticky top-0 z-50 w-full border-b border-glass-border glass relative">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-glass-border shadow-[0_0_15px_rgba(0,239,255,0.2)] group-hover:scale-105 transition-transform">
                    <Image
                      src={getAssetPath("/images/avatar.jpg")}
                      alt="Logo"
                      width={32}
                      height={32}
                      quality={100}
                      className="object-cover rounded-full"
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg font-bold tracking-tighter text-cyan drop-shadow-[0_0_8px_rgba(0,239,255,0.8)] leading-none">
                      MVU AI LAB
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted/60 font-medium">
                      {lang === "ru" ? "Лаборатория ИИ" : "AI Laboratory"}
                    </div>
                  </div>
                </Link>
              </div>

              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link href="/#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-cyan transition-colors">
                  {lang === "ru" ? "Услуги" : "Services"}
                </Link>
                <Link href="/#workflows" onClick={(e) => handleNavClick(e, 'workflows')} className="hover:text-cyan transition-colors">
                  {lang === "ru" ? "Воркфлоу" : "Workflows"}
                </Link>
                <Link href="/#subscriptions" onClick={(e) => handleNavClick(e, 'subscriptions')} className="hover:text-cyan transition-colors">
                  {lang === "ru" ? "Тарифы" : "Pricing"}
                </Link>

                <div className="h-4 w-px bg-glass-bg mx-2" />

                <button
                  onClick={toggleLang}
                  className="flex items-center gap-1.5 hover:text-cyan transition-colors uppercase text-xs tracking-wider font-bold"
                >
                  <Globe size={14} />
                  {lang}
                </button>

                <ThemeSwitcher />
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-foreground hover:text-cyan transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            <div className={cn(
              "md:hidden absolute top-16 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-glass-border overflow-hidden transition-all duration-300 ease-in-out shadow-2xl",
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}>
              <nav className="flex flex-col p-4 gap-4">
                <Link href="/#services" onClick={(e) => handleNavClick(e, 'services')} className="py-2 text-lg font-medium hover:text-cyan transition-colors border-b border-white/5">
                  {lang === "ru" ? "Услуги" : "Services"}
                </Link>
                <Link href="/#workflows" onClick={(e) => handleNavClick(e, 'workflows')} className="py-2 text-lg font-medium hover:text-cyan transition-colors border-b border-white/5">
                  {lang === "ru" ? "Воркфлоу" : "Workflows"}
                </Link>
                <Link href="/#subscriptions" onClick={(e) => handleNavClick(e, 'subscriptions')} className="py-2 text-lg font-medium hover:text-cyan transition-colors border-b border-white/5">
                  {lang === "ru" ? "Тарифы" : "Pricing"}
                </Link>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={toggleLang}
                    className="flex items-center gap-2 hover:text-cyan transition-colors uppercase text-sm font-bold bg-white/5 px-4 py-2 rounded-lg"
                  >
                    <Globe size={18} />
                    {lang === "ru" ? "English" : "Русский"}
                  </button>
                  <div className="bg-white/5 rounded-full p-1">
                    <ThemeSwitcher />
                  </div>
                </div>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-glass-border py-8 relative z-10 glass mt-auto">
            <div className="container mx-auto px-4 text-center">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4 text-sm text-gray-400">
                <Link href="/legal/offer" className="hover:text-cyan transition-colors">
                  {lang === "ru" ? "Оферта" : "Offer"}
                </Link>
                <span className="hidden md:inline text-muted/40">|</span>
                <Link href="/legal/contacts" className="hover:text-cyan transition-colors">
                  {lang === "ru" ? "Реквизиты и Контакты" : "Contacts"}
                </Link>
                <span className="hidden md:inline text-muted/40">|</span>
                <Link href="/legal/return-policy" className="hover:text-cyan transition-colors">
                  {lang === "ru" ? "Политика возврата" : "Refund Policy"}
                </Link>
              </div>
              <div className="text-sm text-gray-600">
                © {new Date().getFullYear()} MVU AI LAB / MaenVaerU. {lang === "ru" ? "Все права защищены." : "All rights reserved."}
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-1.5 hover:text-cyan transition-colors rounded-full hover:bg-glass-bg"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
