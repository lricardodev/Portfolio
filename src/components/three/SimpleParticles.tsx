"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SimpleParticlesProps {
  color?: string;
  secondaryColor?: string;
  intensity?: number;
  particleCount?: number;
}

export const SimpleParticles: React.FC<SimpleParticlesProps> = ({
  color = '#FFFFFF', // Blanco por defecto
  secondaryColor = '#E0E0E0', // Gris muy claro para ligera variación
  intensity = 1,
  particleCount = 500,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Configuración básica ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10; // Un poco más lejos para ver la "caja"

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- Creación de partículas ---
    const finalParticleCount = Math.floor(particleCount * intensity);
    const positions = new Float32Array(finalParticleCount * 3);
    const colors = new Float32Array(finalParticleCount * 3);
    const velocities = new Float32Array(finalParticleCount * 3);
    velocitiesRef.current = velocities; // Guardar referencia para la animación

    const primaryColor = new THREE.Color(color);
    const secColor = new THREE.Color(secondaryColor);
    const boxSize = 20; // Tamaño de la "caja" donde flotan las partículas

    for (let i = 0; i < finalParticleCount; i++) {
      const i3 = i * 3;

      // Posición inicial aleatoria
      positions[i3] = (Math.random() - 0.5) * boxSize;
      positions[i3 + 1] = (Math.random() - 0.5) * boxSize;
      positions[i3 + 2] = (Math.random() - 0.5) * boxSize;

      // Velocidad inicial aleatoria y lenta
      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      // Mezcla sutil de colores
      const colorMix = Math.random();
      const mixedColor = primaryColor.clone().lerp(secColor, colorMix);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // --- Material Sutil y Moderno ---
    const material = new THREE.PointsMaterial({
      size: 0.04 * intensity, // Más pequeñas
      vertexColors: true,
      transparent: true,
      opacity: 0.6, // Más transparentes
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending, // Efecto de "luz" al superponerse
      depthWrite: false, // Mejora el renderizado de transparencia
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Interacción y Animación ---
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      if (!mountRef.current || !velocitiesRef.current) return;
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const positions = geometry.attributes.position.array as Float32Array;
      const vels = velocitiesRef.current;
      const halfBox = boxSize / 2;

      // --- Actualizar posición de cada partícula ---
      for (let i = 0; i < finalParticleCount; i++) {
        const i3 = i * 3;

        positions[i3] += vels[i3];
        positions[i3 + 1] += vels[i3 + 1];
        positions[i3 + 2] += vels[i3 + 2];

        // --- Lógica de "rebote" en los bordes ---
        // Si una partícula se sale, invierte su velocidad
        if (positions[i3] > halfBox || positions[i3] < -halfBox) vels[i3] *= -1;
        if (positions[i3 + 1] > halfBox || positions[i3 + 1] < -halfBox) vels[i3 + 1] *= -1;
        if (positions[i3 + 2] > halfBox || positions[i3 + 2] < -halfBox) vels[i3 + 2] *= -1;
      }
      geometry.attributes.position.needsUpdate = true; // Informar a Three.js que las posiciones cambiaron

      // --- Interacción sutil del mouse (rota la escena) ---
      // El 0.02 es la "suavidad" del movimiento.
      particles.rotation.y += (mouse.x * 0.1 - particles.rotation.y) * 0.02;
      particles.rotation.x += (mouse.y * 0.1 - particles.rotation.x) * 0.02;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    // --- Manejo de Redimensión ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Limpieza ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      velocitiesRef.current = null;
    };
  }, [color, secondaryColor, intensity, particleCount]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }} // Importante para que no bloquee clics
    />
  );
};