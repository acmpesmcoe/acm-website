import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <div className="relative flex flex-col items-center">
        {/* Glow backdrop behind the logo */}
        <motion.div
          className="absolute h-64 w-64 rounded-full bg-accent-primary/10 blur-[60px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Logo Animation Container */}
        <div className="relative h-64 w-64 flex items-center justify-center">
          {/* SVG Outline Drawing Layer */}
          <svg
            viewBox="0 0 300 300"
            className="absolute inset-0 h-full w-full z-0"
          >
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>

            {/* Diamond Outline */}
            <motion.path
              d="M 150,12 L 288,150 L 150,288 L 12,150 Z"
              fill="none"
              stroke="url(#logo-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.4, ease: "easeInOut" },
                opacity: { duration: 0.4 }
              }}
            />
          </svg>

          {/* Full Solid Brand Logo Image Layer (fades in on top) */}
          <motion.img
            src="/logo/acm-logo-neon.png"
            alt="PES's MCOE ACM Student Chapter Logo"
            className="absolute h-[93%] w-[93%] object-contain z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 1.0,
              ease: "easeOut"
            }}
          />
        </div>

        {/* Minimalist premium loading indicator bar */}
        <div className="relative z-10 mt-8 h-[2px] w-36 overflow-hidden rounded-full bg-surface2">
          <motion.div
            className="h-full w-full bg-grad-signal"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
