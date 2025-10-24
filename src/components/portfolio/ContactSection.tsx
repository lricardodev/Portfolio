import React from "react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center space-y-4 sm:space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold green-gradient-text">
          Let's work together?
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          I'm always interested in new projects and opportunities. Let's talk
          about how I can help bring your vision to life!
        </p>
        <div className="pt-6 sm:pt-8">
          <a
            href="mailto:lricardodev@gmail.com"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-kick-green to-kick-green-dark text-white font-semibold rounded-xl hover:from-kick-green-light hover:to-kick-green-accent transition-all duration-300 hover-lift text-sm sm:text-base"
          >
            Send Message
          </a>
        </div>
      </div>
    </section>
  );
}
