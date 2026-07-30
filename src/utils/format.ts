export function fmtNum(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "-";
  return n.toLocaleString("id-ID");
}

export function fmtCompact(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "-";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + " M";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + " Jt";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + " rb";
  return n.toString();
}
