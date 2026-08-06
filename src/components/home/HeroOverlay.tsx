import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroOverlay({ visible, onExplore }: { visible: boolean; onExplore: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <span className="text-bca-primary text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Interactive Geospatial Intelligence
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-bca-ink text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] max-w-3xl"
          >
            Explore Indonesia&apos;s <br className="hidden md:block" /> Domestic Travel Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-bca-sub text-sm md:text-base mt-5 max-w-lg"
          >
            Klik provinsi mana pun untuk membuka data, insight, dan peluang bisnis — seluruhnya dari sumber resmi BPS &amp; Bank Indonesia.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            onClick={onExplore}
            className="pointer-events-auto mt-8 bg-bca-primary text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:scale-[1.03] transition-transform duration-200 flex items-center gap-2 shadow-lg"
          >
            Explore Indonesia <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
