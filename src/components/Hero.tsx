'use client';

import {
  Environment,
  Float,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Floating Ring Component
function FloatingRing({
  position,
  rotationSpeed = 1,
}: {
  position: [number, number, number];
  rotationSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * rotationSpeed;
      meshRef.current.rotation.y += 0.01 * rotationSpeed;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

// Stylized Hand Component
function Hand() {
  const handRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (handRef.current) {
      handRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={handRef} position={[0, -0.5, 0]}>
      {/* Palm */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.3]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.7} />
      </mesh>

      {/* Fingers */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[-0.3 + i * 0.2, 0.6, 0]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
            <meshStandardMaterial color="#f5e6d3" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.4, 8]} />
            <meshStandardMaterial color="#f5e6d3" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Ring on finger */}
      <mesh position={[0.1, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.09, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={1}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// Sparkle Particles
function Sparkles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#D4AF37"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// 3D Scene
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={0.5}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#D4AF37" />

      <Hand />
      <FloatingRing position={[-1.5, 1, 0]} rotationSpeed={0.8} />
      <FloatingRing position={[1.5, 0.5, 0]} rotationSpeed={1.2} />
      <FloatingRing position={[0, 2, -1]} rotationSpeed={1.5} />
      <Sparkles />

      <Environment preset="city" />
    </>
  );
}

// Main Hero Component
export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0F0F0F]">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <h1 className="mb-4 font-cormorant text-7xl font-bold leading-none tracking-tight text-white md:text-9xl">
            Her Parça
            <br />
            <span className="text-gradient">Bir Hikaye</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl font-inter text-lg text-white/70 md:text-xl">
            Premium kalitede çelik takılar ile tarzınızı yansıtın. Her parça
            özenle seçilmiş, sizin için tasarlandı.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#collections');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden rounded-full bg-gold-gradient px-8 py-4 font-inter font-semibold text-black shadow-lg transition-all hover:shadow-2xl hover:shadow-gold/50"
            >
              <span className="relative z-10">Koleksiyonu Keşfet</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#about');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass rounded-full px-8 py-4 font-inter font-semibold text-white transition-all hover:bg-white/10"
            >
              Hakkımızda
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Product Pills - 3 adet - Mobil optimize */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="glass absolute left-4 top-[20%] hidden items-center gap-2 rounded-full px-3 py-2 md:left-8 md:flex lg:gap-3 lg:px-4 lg:py-3"
        >
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-white/10 lg:h-12 lg:w-12" />
          <div className="min-w-0">
            <p className="truncate font-inter text-xs font-semibold text-white lg:text-sm">
              Radiant Bloom Ring
            </p>
            <p className="font-inter text-[10px] text-white/60 lg:text-xs">
              ₺299
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold text-xs text-black lg:ml-2 lg:h-8 lg:w-8"
          >
            +
          </motion.button>
        </motion.div>

        {/* Product Pill 2 */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="glass absolute left-4 top-[30%] hidden items-center gap-2 rounded-full px-3 py-2 md:left-8 md:flex lg:gap-3 lg:px-4 lg:py-3"
        >
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-white/10 lg:h-12 lg:w-12" />
          <div className="min-w-0">
            <p className="truncate font-inter text-xs font-semibold text-white lg:text-sm">
              Minimal Çelik Kolye
            </p>
            <p className="font-inter text-[10px] text-white/60 lg:text-xs">
              ₺349
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold text-xs text-black lg:ml-2 lg:h-8 lg:w-8"
          >
            +
          </motion.button>
        </motion.div>

        {/* Product Pill 3 */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="glass absolute left-4 top-[40%] hidden items-center gap-2 rounded-full px-3 py-2 md:left-8 md:flex lg:gap-3 lg:px-4 lg:py-3"
        >
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-white/10 lg:h-12 lg:w-12" />
          <div className="min-w-0">
            <p className="truncate font-inter text-xs font-semibold text-white lg:text-sm">
              Geometrik Bilezik
            </p>
            <p className="font-inter text-[10px] text-white/60 lg:text-xs">
              ₺249
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold text-xs text-black lg:ml-2 lg:h-8 lg:w-8"
          >
            +
          </motion.button>
        </motion.div>

        {/* Social Proof - WhatsApp Linki - Mobil optimize */}
        <motion.a
          href="https://wa.me/905451125059"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          className="glass absolute bottom-20 right-4 hidden cursor-pointer rounded-xl px-4 py-3 transition-all hover:bg-white/10 md:right-8 md:block lg:rounded-2xl lg:px-6 lg:py-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-full border-2 border-[#0F0F0F] bg-white/20 lg:h-8 lg:w-8"
                />
              ))}
            </div>
            <span className="font-inter text-xs font-semibold text-white lg:text-sm">
              4.5k+
            </span>
          </div>
          <p className="font-inter text-[10px] text-white/60 lg:text-xs">
            Mutlu Müşteri
          </p>
          <p className="mt-1 font-inter text-[10px] text-gold lg:text-xs">
            📱 WhatsApp ile İletişim
          </p>
        </motion.a>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-inter text-xs uppercase tracking-wider text-white/60">
              Kaydır
            </span>
            <div className="h-8 w-5 rounded-full border-2 border-white/30">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mx-auto mt-1 h-2 w-2 rounded-full bg-white/60"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-transparent to-[#0F0F0F]/80" />
    </section>
  );
}
