"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SimpleGeometriesProps {
  color?: string;
  secondaryColor?: string;
  intensity?: number;
}

export const SimpleGeometries: React.FC<SimpleGeometriesProps> = ({
  color = '#FFFFFF',
  secondaryColor = '#F5F5F5',
  intensity = 1
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    currentMount.appendChild(renderer.domElement);

    // Geometrías más sutiles y elegantes
    const geometries = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(0.9),
      new THREE.TetrahedronGeometry(1),
      new THREE.TorusGeometry(0.6, 0.2, 8, 24),
      new THREE.BoxGeometry(0.9, 0.9, 0.9)
    ];

    const primaryColor = new THREE.Color(color);
    const secColor = new THREE.Color(secondaryColor);

    const meshes: THREE.Mesh[] = [];

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? primaryColor : secColor,
        transparent: true,
        opacity: 0.15 * intensity,
        wireframe: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      // Posiciones más espaciadas y estratégicas
      const angle = (index / geometries.length) * Math.PI * 2;
      const radius = 6;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = (Math.random() - 0.5) * 4;
      mesh.position.z = Math.sin(angle) * radius - 2;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;

      scene.add(mesh);
      meshes.push(mesh);
    });

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.001;

      // Suavizar movimiento del mouse
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Animar geometrías de forma más sutil
      meshes.forEach((mesh, index) => {
        // Rotación muy lenta y elegante
        mesh.rotation.x += 0.002 * (index % 2 === 0 ? 1 : -1);
        mesh.rotation.y += 0.003 * (index % 2 === 0 ? -1 : 1);
        
        // Movimiento flotante suave
        mesh.position.y += Math.sin(time * 2 + index) * 0.002;
        
        // Influencia sutil del mouse
        const targetX = mesh.position.x + mouse.x * 0.5;
        const targetZ = mesh.position.z + mouse.y * 0.5;
        mesh.position.x += (targetX - mesh.position.x) * 0.01;
        mesh.position.z += (targetZ - mesh.position.z) * 0.01;

        // Efecto de pulsación suave en la opacidad
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = (0.12 + Math.sin(time * 3 + index) * 0.03) * intensity;
      });

      // Movimiento muy suave de la cámara
      camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometries.forEach(geo => geo.dispose());
      meshes.forEach(mesh => (mesh.material as THREE.Material).dispose());
    };
  }, [color, secondaryColor, intensity]);

  return (
    <div 
      ref={mountRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};