import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as RTooltip } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { UnavailableStateInline } from "@/components/masterdata/UnavailableState";
import { useAppData } from "@/context/DataContext";

export function PaymentTab() {
  const { data } = useAppData();
  if (!data) return null;

  const chartData = data.qris
    .map((q) => ({
      period: q.period.split(" (")[0],
      users: parseFloat(q.users) || null,
    }))
    .filter((d): d is { period: string; users: number } => d.users !== null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <GlassCard className="lg:col-span-3 p-6">
        <p className="text-xs font-semibold text-bca-ink mb-4">QRIS growth — national (Bank Indonesia)</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <RTooltip contentStyle={{ borderRadius: 10, border: "1px solid #E8EEF4", fontSize: 11 }} />
              <Bar dataKey="users" name="Users (M)" radius={[6, 6, 0, 0]} fill="#005BAC" maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard className="lg:col-span-2 p-6">
        <p className="text-xs font-semibold text-bca-ink mb-3">
          Payment method mix (Cash / Debit / Credit / QRIS / Transfer / E-wallet)
        </p>
        <UnavailableStateInline text="Payment method mix by province is not published by Bank Indonesia at province granularity in the sources collected so far — only national QRIS user/merchant/transaction figures are verified. See workbook 06_QRIS_Digital_Payment." />
      </GlassCard>
    </div>
  );
}
