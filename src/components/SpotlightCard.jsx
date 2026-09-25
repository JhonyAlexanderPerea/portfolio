import { useRef } from "react";

/**
 * Wraps children in a card whose border/background glows toward the cursor.
 * Pure CSS-var based (no re-renders on mouse move) for smooth 60fps feel.
 */
export default function SpotlightCard({ children, className = "", as: Tag = "div", ...rest }) {
  const ref = useRef(null);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    ref.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    ref.current.style.setProperty("--tilt-x", `${(x - 0.5) * 5}deg`);
    ref.current.style.setProperty("--tilt-y", `${(0.5 - y) * 5}deg`);
  }

  function handleLeave() {
    ref.current.style.setProperty("--tilt-x", "0deg");
    ref.current.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`spotlight-card ${className}`}
      {...rest}
    >
      <div className="spotlight-glow" aria-hidden />
      <div className="relative">{children}</div>
    </Tag>
  );
}
