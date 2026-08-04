export const MD_TABS = [
  "Overview", "Province", "Destination", "Payment", "BCA Network", "Compare", "References",
] as const;

export type MDTab = (typeof MD_TABS)[number];

export function Tabs({ active, setActive }: { active: MDTab; setActive: (t: MDTab) => void }) {
  return (
    <div className="max-w-[1200px] mx-auto mt-6 px-4 md:px-0 flex gap-1.5 overflow-x-auto pb-1" role="tablist">
      {MD_TABS.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={active === t}
          onClick={() => setActive(t)}
          className={`text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap transition-colors duration-200 ${
            active === t ? "bg-bca-primary text-white shadow-sm" : "bg-white border border-bca-border text-bca-sub hover:text-bca-primary"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
