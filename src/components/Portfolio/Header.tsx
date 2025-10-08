"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { name: "Sobre mí", sectionId: "about" },
  { name: "Proyectos", sectionId: "projects" },
  { name: "Habilidades", sectionId: "skills" },
  { name: "Contacto", sectionId: "contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(true)

  // Manejar scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Inicializar tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const themeToSet = savedTheme ? savedTheme === 'dark' : prefersDark

    setIsDark(themeToSet)
    document.documentElement.classList.toggle('dark', themeToSet)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newTheme)
  }

  const handleSectionClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const NavList = ({ isMobile = false }) => (
    <ul className={cn(
      "flex space-x-1",
      isMobile && "overflow-x-auto scrollbar-hide justify-center"
    )}>
      {NAV_ITEMS.map((item) => (
        <li key={item.name} className={isMobile ? "flex-shrink-0" : ""}>
          <Button
            variant="ghost"
            onClick={() => handleSectionClick(item.sectionId)}
            className={cn(
              "text-foreground hover:text-primary transition-colors",
              isMobile && "text-xs px-2"
            )}
          >
            {item.name}
          </Button>
        </li>
      ))}
    </ul>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-4 glass-card-dark">
          <div className="flex items-center justify-between md:mb-0">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold dark-blue-gradient-text dark:silver-blue-gradient-text">
                RichardDev - Portfolio
              </span>
            </Link>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2 md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative z-10">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>

          {/* Navegación Móvil */}
          <nav className="md:hidden">
            <NavList isMobile />
          </nav>

          {/* Navegación Desktop */}
          <div className="hidden md:flex md:items-center md:justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
            <nav>
              <NavList />
            </nav>
          </div>
        </Card>
      </div>
    </header>
  )
}