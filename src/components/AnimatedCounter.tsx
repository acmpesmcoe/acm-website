import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 30, stiffness: 60 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    spring.on("change", (v) => {
      if (displayRef.current) displayRef.current.textContent = Math.round(v).toString();
    });
  }, [spring]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-semibold text-ink-primary md:text-5xl">
        <motion.span ref={displayRef}>0</motion.span>
        <span className="text-gradient">{suffix}</span>
      </div>
      <p className="mt-2 font-mono text-xs text-ink-muted">{label}</p>
    </div>
  );
}
