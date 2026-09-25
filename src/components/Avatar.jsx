import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import profilePhoto from "../assets/profile.jpg";
import { profile } from "../data/profile";

export default function Avatar() {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 150, damping: 15, mass: 0.5 };
  const rx = useSpring(useTransform(my, [0, 1], [12, -12]), spring);
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), spring);
  const glowX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [0, 1], ["0%", "100%"]);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative shrink-0"
      style={{ perspective: 800 }}
    >
      {/* animated glow ring */}
      <motion.div
        aria-hidden
        className="absolute -inset-3 rounded-full opacity-60 blur-xl"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-accent), var(--color-accent-2), var(--color-accent))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-border overflow-hidden bg-surface shadow-[0_0_40px_-8px_rgba(57,255,106,0.45)]"
      >
        <img
          src={profilePhoto}
          alt={profile.name}
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />
        {/* mouse-tracked sheen */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            background: `radial-gradient(120px circle at ${glowX} ${glowY}, rgba(255,255,255,0.35), transparent 60%)`,
          }}
        />
        {/* scanline overlay for terminal feel */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-accent/20 pointer-events-none" />
      </motion.div>

      {/* status dot */}
      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-accent border-2 border-bg shadow-[0_0_8px_rgba(57,255,106,0.8)]">
        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
      </span>
    </motion.div>
  );
}
