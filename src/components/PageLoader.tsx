import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <div className="font-mono text-sm text-accent-secondary eyebrow">
        <TypedLine />
      </div>
      <div className="mt-6 h-[2px] w-40 overflow-hidden rounded-full bg-surface2">
        <motion.div
          className="h-full w-full bg-grad-signal"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

function TypedLine() {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      $ initializing acm_mcoe --chapter=pes
    </motion.span>
  );
}
