import React from "react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-[50vh] flex items-center justify-center"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold green-gradient-text">
          ¿Trabajamos juntos?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
          Estoy siempre interesado en nuevos proyectos y oportunidades.
          ¡Hablemos sobre cómo puedo ayudar a hacer realidad tu visión!
        </p>
        <div className="pt-8">
          <a
            href="mailto:lricardodev@gmail.com"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-kick-green to-kick-green-dark text-white font-semibold rounded-xl hover:from-kick-green-light hover:to-kick-green-accent transition-all duration-300 hover-lift"
          >
            Enviar mensaje
          </a>
        </div>
      </div>
    </section>
  );
}
