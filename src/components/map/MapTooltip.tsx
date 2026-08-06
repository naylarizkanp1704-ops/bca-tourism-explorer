import { AnimatePresence, motion } from "framer-motion";
import { useAppData } from "@/context/DataContext";
import { fmtNum } from "@/utils/format";

interface Props {
  name: string | null;
  x: number;
  y: number;
}

export function MapTooltip({ name, x, y }: Props) {
  const { data } = useAppData();
  const trip = name && data ? data.trips[name] : null;

  return (
    <AnimatePresence>
      {name && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute z-20 bg-white rounded-2xl shadow-xl border border-bca-border px-4 py-3 min-w-[190px]"
          style={{ left: Math.min(x + 16, window.innerWidth - 220), top: y + 16 }}
        >
          <p className="text-sm font-semibold text-bca-ink">{name}</p>
          {trip ? (
            <>
              <p className="text-xs text-bca-sub mt-1">
                Trip Jan–Jun 2025: <span className="font-medium text-bca-ink">{fmtNum(trip.trips2025)}</span>
              </p>
              <p className="text-xs font-medium mt-0.5 text-bca-accent">+{trip.growth}% vs 2024</p>
            </>
          ) : (
            <p className="text-xs text-bca-sub mt-1">Click to explore</p>
          )}
          <p className="text-[10px] text-bca-sub/70 mt-1.5">Click to explore &rarr;</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
