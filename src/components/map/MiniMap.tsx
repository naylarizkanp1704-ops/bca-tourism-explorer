import { useAppData } from "@/context/DataContext";

interface Props {
  selectedName: string | null;
  onSelect: (name: string) => void;
  height?: number;
}

export function MiniMap({ selectedName, onSelect, height = 260 }: Props) {
  const { geo } = useAppData();
  if (!geo) return <div style={{ height }} className="w-full bg-bca-soft rounded-xl animate-pulse" />;

  return (
    <svg viewBox={`0 0 ${geo.width} ${geo.height}`} style={{ height }} className="w-full" role="img" aria-label="Mini map, click a province to highlight the table row">
      <g stroke="#ffffff" strokeWidth={0.7}>
        {Object.entries(geo.provinces).map(([name, p]) => (
          <path
            key={name}
            d={p.d}
            fill={selectedName === name ? "#005BAC" : "#DCE9F7"}
            className="cursor-pointer transition-colors duration-200"
            onClick={() => onSelect(name)}
          />
        ))}
      </g>
    </svg>
  );
}
