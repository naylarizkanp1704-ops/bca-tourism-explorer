import { motion } from "framer-motion";

export function PageHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl mx-auto text-center pt-10 pb-8 px-6"
    >
      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-bca-secondary">{eyebrow}</span>
      <h1 className="text-3xl md:text-4xl font-bold text-bca-ink mt-2 tracking-tight">{title}</h1>
      {desc && <p className="text-bca-sub text-sm md:text-base mt-3 leading-relaxed">{desc}</p>}
    </motion.div>
  );
}
