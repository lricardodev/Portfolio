// @ts-ignore

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrolly > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const themeToSet = savedTheme ? savedTheme === 'dark' : prefersDark
        setIsDark(themeToSet)
        if (themeToSet) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)
        localStorage.setItem('theme', newTheme ? 'dark' : 'light')
        if (newTheme) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    const handleSectionClick = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                // isScrolled ? "glass-silver-blue shadow-lg backdrop-blur-xl" : "bg-transparent/30 backdrop-blur-md",
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="p-2 glass-card-dark">
                    {/* Header superior con logo y botón de tema */}
                    <div className="flex items-center justify-between  md:mb-0">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                <span className="text-lg font-bold dark-blue-gradient-text dark:silver-blue-gradient-text">
                                    RichardDev - Portfolio
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">
                            <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative z-10">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                        </div>
                    </div>

                    {/* Navegación debajo del logo */}
                    <nav className="md:hidden">
                        <ul className="flex space-x-1 overflow-x-auto scrollbar-hide justify-center">
                            {[
                                { name: "Sobre mí", sectionId: "about" },
                                { name: "Proyectos", sectionId: "projects" },
                                { name: "Habilidades", sectionId: "skills" },
                                { name: "Contacto", sectionId: "contact" },
                            ].map((item) => (
                                <li key={item.name} className="flex-shrink-0">
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSectionClick(item.sectionId)}
                                        className="text-foreground hover:text-primary transition-colors text-xs px-2"
                                    >
                                        {item.name}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Navegación desktop (centrada) */}
                    <div className="hidden md:flex md:items-center md:justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
                        <nav>
                            <ul className="flex space-x-1">
                                {[
                                    { name: "Sobre mí", sectionId: "about" },
                                    { name: "Proyectos", sectionId: "projects" },
                                    { name: "Habilidades", sectionId: "skills" },
                                    { name: "Contacto", sectionId: "contact" },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSectionClick(item.sectionId)}
                                            className="text-foreground hover:text-primary transition-colors"
                                        >
                                            {item.name}
                                        </Button>
                                    </li>
                                ))}
                                <li>
                                    <Link href="/terminal" passHref>
                                        <Button variant="ghost">Terminal</Button>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Card>
            </div>
        </header>
    )
}