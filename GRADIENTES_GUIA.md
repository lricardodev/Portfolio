# Guía de Gradientes Negro-Púrpura

Esta guía explica cómo usar los efectos gradientes en negro intenso y púrpura implementados en el proyecto.

## 🎨 Clases CSS Disponibles

### Gradientes de Fondo

#### `.dark-gradient-bg`
- **Uso**: Fondo principal con gradiente negro a púrpura
- **Aplicación**: Ideal para el body o contenedores principales
- **Efecto**: Gradiente diagonal de negro intenso a púrpura oscuro

```tsx
<body className="dark-gradient-bg min-h-screen">
```

#### `.animated-gradient-bg`
- **Uso**: Fondo con gradiente animado
- **Aplicación**: Elementos que necesiten un efecto dinámico
- **Efecto**: Gradiente que se mueve suavemente en 15 segundos

```tsx
<div className="animated-gradient-bg p-8 rounded-2xl">
  <h2>Contenido con fondo animado</h2>
</div>
```

### Tarjetas y Contenedores

#### `.dark-gradient-card`
- **Uso**: Tarjetas con gradiente púrpura oscuro
- **Aplicación**: Cards, contenedores de contenido
- **Efecto**: Gradiente sutil con borde púrpura

```tsx
<Card className="dark-gradient-card p-6">
  <h3>Título de la tarjeta</h3>
  <p>Contenido de la tarjeta</p>
</Card>
```

#### `.glass-purple`
- **Uso**: Efecto de vidrio esmerilado con púrpura
- **Aplicación**: Headers, modales, overlays
- **Efecto**: Fondo translúcido con blur y borde púrpura

```tsx
<header className="glass-purple shadow-lg">
  <nav>Navegación</nav>
</header>
```

### Botones

#### `.purple-gradient-button`
- **Uso**: Botones principales con gradiente púrpura
- **Aplicación**: CTAs, botones de acción
- **Efecto**: Gradiente púrpura con sombra y hover animado

```tsx
<Button className="purple-gradient-button text-white font-semibold">
  Comenzar Ahora
</Button>
```

### Texto

#### `.purple-gradient-text`
- **Uso**: Texto con gradiente púrpura
- **Aplicación**: Títulos, elementos destacados
- **Efecto**: Texto con gradiente púrpura usando background-clip

```tsx
<h1 className="text-6xl font-bold purple-gradient-text">
  Título Principal
</h1>
```

### Efectos Especiales

#### `.purple-glow`
- **Uso**: Elementos con resplandor púrpura
- **Aplicación**: Elementos destacados, iconos
- **Efecto**: Sombra con resplandor púrpura en múltiples capas

```tsx
<div className="purple-glow dark-gradient-card p-8 rounded-2xl">
  <h2>Elemento con resplandor</h2>
</div>
```

## 🎯 Variables CSS del Tema Oscuro

El tema oscuro utiliza las siguientes variables HSL:

```css
.dark {
  --background: 0 0% 0%;           /* Negro intenso */
  --foreground: 0 0% 95%;          /* Blanco puro */
  --primary: 270 100% 70%;         /* Púrpura vibrante */
  --secondary: 270 30% 15%;        /* Púrpura medio */
  --muted: 270 20% 12%;            /* Púrpura apagado */
  --accent: 270 50% 25%;           /* Púrpura intenso */
  --border: 270 20% 18%;           /* Borde púrpura sutil */
}
```

## 🚀 Ejemplos de Uso

### Página Principal
```tsx
export default function HomePage() {
  return (
    <div className="dark-gradient-bg min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-bold purple-gradient-text text-center mb-8">
          Bienvenido
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dark-gradient-card p-6">
            <h3 className="text-xl font-semibold mb-4">Característica 1</h3>
            <p className="text-muted-foreground">Descripción de la característica</p>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button className="purple-gradient-button text-white px-8 py-3">
            Comenzar
          </Button>
        </div>
      </main>
    </div>
  )
}
```

### Header con Efectos
```tsx
<header className="fixed top-0 left-0 right-0 z-50 glass-purple">
  <div className="container mx-auto px-4">
    <Card className="dark-gradient-card p-2">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold purple-gradient-text">
          Mi Portfolio
        </span>
        <nav className="flex gap-4">
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Inicio
          </Button>
        </nav>
      </div>
    </Card>
  </div>
</header>
```

## 🎨 Personalización

### Modificar Colores
Para cambiar los tonos de púrpura, modifica las variables HSL en `globals.css`:

```css
/* Púrpura más intenso */
--primary: 270 100% 60%;

/* Púrpura más suave */
--primary: 270 80% 70%;

/* Púrpura más oscuro */
--primary: 270 100% 50%;
```

### Crear Nuevos Gradientes
Agrega nuevas clases en la sección `@layer components`:

```css
.my-custom-gradient {
  background: linear-gradient(135deg, 
    hsl(270, 100%, 70%) 0%, 
    hsl(300, 100%, 60%) 100%);
}
```

## 📱 Responsive Design

Todas las clases son responsive y se adaptan automáticamente a diferentes tamaños de pantalla. Para ajustes específicos:

```tsx
<div className="dark-gradient-bg p-4 md:p-8 lg:p-12">
  <h1 className="text-4xl md:text-6xl font-bold purple-gradient-text">
    Título Responsive
  </h1>
</div>
```

## ⚡ Rendimiento

- Los gradientes CSS son optimizados para rendimiento
- Las animaciones usan `transform` y `opacity` para mejor performance
- Los efectos de blur usan `backdrop-filter` con fallbacks

## 🔧 Troubleshooting

### El gradiente no se ve
- Verifica que el elemento tenga la clase `dark` aplicada
- Asegúrate de que el archivo `globals.css` esté importado
- Revisa que Tailwind CSS esté configurado correctamente

### El texto con gradiente no funciona
- Verifica que el navegador soporte `background-clip: text`
- Asegúrate de que el texto tenga suficiente contraste
- Considera usar un fallback de color sólido

### Las animaciones no funcionan
- Verifica que `tailwindcss-animate` esté instalado
- Asegúrate de que las clases de animación estén en el build final
- Revisa la configuración de Tailwind CSS
