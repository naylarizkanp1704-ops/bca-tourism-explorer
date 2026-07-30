import { motion } from "framer-motion";

export function LoadingScreen({ progress = 0 }: { progress?: number }) {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
      <motion.img
        src={`${import.meta.env.BASE_URL}logo/bca-logo.svg`}
        alt="BCA"
        className="h-9 w-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.p
        className="text-xs text-bca-sub mt-5 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        Loading Tourism Intelligence Explorer&hellip;
      </motion.p>
      <div className="w-48 h-1 bg-bca-border rounded-full mt-5 overflow-hidden">
        <motion.div
          className="h-full bg-bca-primary rounded-full"
          animate={{ width: `${Math.max(6, progress)}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>
      <p className="text-[10px] text-bca-sub/70 mt-2">{Math.round(progress)}%</p>
    </div>
  );
}

export function LoadingSkeletonCard() {
  return <div className="animate-pulse bg-bca-border/60 rounded-2xl h-24 w-full" />;
}
