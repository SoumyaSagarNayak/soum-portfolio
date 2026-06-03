"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorCat() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isWalking, setIsWalking] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [hasMoved, setHasMoved] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Hide cat on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!hasMoved) {
        // Initialize position on first move to prevent starting at 0,0
        currentPosRef.current = { x: e.clientX, y: e.clientY + 20 };
        setHasMoved(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const updatePosition = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y + 24; // Offset slightly below the cursor

      const dx = targetX - currentPosRef.current.x;
      const dy = targetY - currentPosRef.current.y;

      // Check distance to transition states
      const distance = Math.hypot(dx, dy);

      if (distance > 2) {
        setIsWalking(true);
        // Slowly interpolate (lerp) towards target
        currentPosRef.current.x += dx * 0.06;
        currentPosRef.current.y += dy * 0.06;

        // Flip left/right based on direction of movement
        if (dx > 0.5) {
          setFacingRight(true);
        } else if (dx < -0.5) {
          setFacingRight(false);
        }
      } else {
        setIsWalking(false);
      }

      setPosition({
        x: currentPosRef.current.x,
        y: currentPosRef.current.y,
      });

      animationFrameRef.current = requestAnimationFrame(updatePosition);
    };

    animationFrameRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasMoved]);

  if (!hasMoved) return null;

  return (
    <div
      ref={catRef}
      className="fixed pointer-events-none z-50 select-none hidden md:block"
      style={{
        transform: `translate3d(${position.x - 24}px, ${position.y - 24}px, 0)`,
        width: "48px",
        height: "48px",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cat-wobble {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes cat-breath {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.96); }
        }
        @keyframes cat-leg-1 {
          0% { transform: rotate(-12deg); }
          100% { transform: rotate(12deg); }
        }
        @keyframes cat-leg-2 {
          0% { transform: rotate(12deg); }
          100% { transform: rotate(-12deg); }
        }
        @keyframes cat-tail-walk {
          0% { transform: rotate(-8deg); }
          100% { transform: rotate(8deg); }
        }
        @keyframes cat-tail-idle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-10deg); }
        }
      `}} />

      <div
        className="w-full h-full"
        style={{
          transform: `scaleX(${facingRight ? 1 : -1})`,
          transition: "transform 0.15s ease",
          animation: isWalking
            ? "cat-wobble 0.35s infinite ease-in-out"
            : "cat-breath 2s infinite ease-in-out",
          transformOrigin: "center bottom",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tail */}
          <path
            d="M34 26C38 26 40 22 39 17"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              transformOrigin: "bottom left",
              animation: isWalking ? "cat-tail-walk 0.35s infinite alternate ease-in-out" : "cat-tail-idle 2s infinite ease-in-out",
            }}
          />

          {/* Body */}
          <rect
            x="14"
            y="22"
            width="20"
            height="12"
            rx="4"
            fill="var(--ink)"
            stroke="var(--canvas)"
            strokeWidth="2.5"
          />

          {/* Head */}
          <rect
            x="8"
            y="14"
            width="12"
            height="12"
            rx="3"
            fill="var(--ink)"
            stroke="var(--canvas)"
            strokeWidth="2.5"
          />

          {/* Ears */}
          <polygon
            points="8,14 5,8 11,14"
            fill="var(--ink)"
            stroke="var(--canvas)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon
            points="16,14 18,8 20,14"
            fill="var(--ink)"
            stroke="var(--canvas)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Eyes */}
          <circle cx="11.5" cy="19" r="1.5" fill="var(--canvas)" />
          <circle cx="16.5" cy="19" r="1.5" fill="var(--canvas)" />

          {/* Nose/Mouth */}
          <path
            d="M13.5 21L14 22L14.5 21"
            stroke="var(--canvas)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Legs */}
          {/* Front Left */}
          <rect
            x="16"
            y="32"
            width="3.5"
            height="7"
            rx="1"
            fill="var(--ink)"
            stroke="var(--canvas)"
            strokeWidth="2"
            style={{
              transformOrigin: "top center",
              animation: isWalking ? "cat-leg-1 0.35s infinite alternate ease-in-out" : "none",
            }}
          />
          {/* Front Right */}
          <rect
            x="20.5"
            y="32"
            width="3.5"
            height="7"
            rx="1"
            fill="var(--ink)"
            stroke="var(--canvas)"
            strokeWidth="2"
            style={{
              transformOrigin: "top center",
              animation: isWalking ? "cat-leg-2 0.35s infinite alternate ease-in-out" : "none",
            }}
          />
          {/* Back Left */}
          <rect
            x="25.5"
            y="32"
            width="3.5"
            height="7"
            rx="1"
            fill="var(--ink)"
            stroke="var(--canvas)"
            strokeWidth="2"
            style={{
              transformOrigin: "top center",
              animation: isWalking ? "cat-leg-2 0.35s infinite alternate ease-in-out" : "none",
            }}
          />
          {/* Back Right */}
          <rect
            x="30"
            y="32"
            width="3.5"
            height="7"
            rx="1"
            fill="var(--ink)"
            stroke="var(--canvas)"
            strokeWidth="2"
            style={{
              transformOrigin: "top center",
              animation: isWalking ? "cat-leg-1 0.35s infinite alternate ease-in-out" : "none",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
