import { X } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function UnavailableState({
  title,
  explanation,
  whatIsAvailable,
}: {
  title: string;
  explanation: string;
  whatIsAvailable?: string;
}) {
  return (
    <GlassCard className="p-8 text-center max-w-2xl mx-auto">
      <div className="w-12 h-12 rounded-2xl bg-bca-soft flex items-center justify-center mx-auto mb-4">
        <X size={18} className="text-bca-sub" />
      </div>
      <p className="text-sm font-semibold text-bca-ink">{title}</p>
      <p className="text-xs text-bca-sub mt-2 leading-relaxed">{explanation}</p>
      {whatIsAvailable && (
        <p className="text-xs text-bca-primary mt-4 leading-relaxed bg-bca-hover rounded-xl p-3.5">{whatIsAvailable}</p>
      )}
    </GlassCard>
  );
}

export function UnavailableStateInline({ text }: { text: string }) {
  return <p className="text-[11px] text-bca-sub leading-relaxed bg-bca-soft rounded-xl p-3.5">{text}</p>;
}
