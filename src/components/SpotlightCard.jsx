import { useRef } from "react";

/**
 * Wraps children in a card whose border/background glows toward the cursor.
 * Pure CSS-var based (no re-renders on mouse move) for smooth 60fps feel.
 */
export default function SpotlightCard({ children, className = "", as: Tag = "div", ...rest }) {
  const ref = useRef(null);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={`spotlight-card ${className}`}
      {...rest}
    >
      <div className="spotlight-glow" aria-hidden />
      <div className="relative">{children}</div>
    </Tag>
  );
}
