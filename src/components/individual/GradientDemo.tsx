// TODO: individual project
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function GradientDemo() {
  return (
    <div className="min-h-screen p-8 space-y-8">
       {/* Título principal con gradiente */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold purple-gradient-text">
          Descubre Soluciones de Hosting y Dominio de Primera
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Proporcionamos los mejores servicios de hosting y dominio para todas tus necesidades con soporte ilimitado
        </p>
      </div>

      {/* Botones con gradientes */}
      <div className="flex justify-center gap-4">
        <Button className="purple-gradient-button text-white font-semibold px-8 py-3">
          Comenzar Ahora →
        </Button>
        <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
          Más Información
        </Button>
      </div>

      {/* Tarjetas con gradientes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="dark-gradient-card p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold">✓</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Dominio Gratis</h3>
          <p className="text-muted-foreground">Obtén un dominio gratis con tu plan de hosting</p>
        </Card>

        <Card className="dark-gradient-card p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold">✓</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Migración Gratuita</h3>
          <p className="text-muted-foreground">Migración gratuita de tu sitio web</p>
        </Card>

        <Card className="dark-gradient-card p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold">✓</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Soporte 24/7</h3>
          <p className="text-muted-foreground">Soporte al cliente las 24 horas del día</p>
        </Card>
      </div>

      {/* Elemento con resplandor */}
      <div className="text-center">
        <div className="inline-block p-8 rounded-2xl purple-glow dark-gradient-card">
          <h2 className="text-3xl font-bold purple-gradient-text mb-4">
            Elemento con Resplandor Púrpura
          </h2>
          <p className="text-muted-foreground">
            Este elemento demuestra el efecto de resplandor púrpura
          </p>
        </div>
      </div>

      {/* Fondo animado */}
      <div className="text-center">
        <div className="inline-block p-8 rounded-2xl animated-gradient-bg">
          <h2 className="text-3xl font-bold text-white mb-4">
            Fondo con Gradiente Animado
          </h2>
          <p className="text-gray-300">
            Este elemento tiene un fondo con gradiente que se anima suavemente
          </p>
        </div>
      </div>

      {/* Texto con diferentes gradientes */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold purple-gradient-text">
          Texto con Gradiente Púrpura
        </h2>
        <p className="text-lg text-muted-foreground">
          Este es un ejemplo de cómo se ve el texto con gradiente púrpura aplicado
        </p>
      </div>
    </div>
  )
}
