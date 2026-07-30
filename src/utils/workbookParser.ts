import type { WorkSheet } from "xlsx";
import * as XLSX from "xlsx";

type Cell = string | number | boolean | null;

/**
 * Finds the header row inside a worksheet by matching the first N expected
 * column labels (case-insensitive, trimmed), then returns every data row
 * below it as a plain object keyed by the header text, stopping at the first
 * fully-empty row (or a row whose first meaningful cell equals a stop marker
 * such as the "INDONESIA (total)" summary row).
 *
 * This is resilient to the exact row numbers shifting if the workbook is
 * regenerated — it locates data by header text, not by hardcoded coordinates.
 */
export function extractRows(
  ws: WorkSheet,
  expectedHeaderStart: string[],
  opts: { stopValues?: string[] } = {}
): Record<string, Cell>[] {
  const grid = XLSX.utils.sheet_to_json<Cell[]>(ws, { header: 1, defval: null, blankrows: true });
  const stopValues = (opts.stopValues || []).map((s) => s.toLowerCase());

  const norm = (v: Cell) => (v === null || v === undefined ? "" : String(v).trim().toLowerCase());

  let headerRowIdx = -1;
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    if (!row) continue;
    const matches = expectedHeaderStart.every((h, i) => norm(row[i]) === h.toLowerCase());
    if (matches) {
      headerRowIdx = r;
      break;
    }
  }
  if (headerRowIdx === -1) return [];

  const headers = grid[headerRowIdx].map((h) => (h === null ? "" : String(h).trim()));
  const out: Record<string, Cell>[] = [];

  for (let r = headerRowIdx + 1; r < grid.length; r++) {
    const row = grid[r];
    const firstCell = row && row[0] !== undefined ? row[0] : null;
    const secondCell = row && row[1] !== undefined ? row[1] : null;

    const isEmpty = !row || row.every((c) => c === null || c === "" || c === undefined);
    if (isEmpty) break;

    if (stopValues.includes(norm(firstCell)) || stopValues.includes(norm(secondCell))) break;

    const obj: Record<string, Cell> = {};
    headers.forEach((h, i) => {
      if (!h) return;
      obj[h] = row[i] === undefined ? null : row[i];
    });
    out.push(obj);
  }
  return out;
}

export function toNumber(v: Cell): number | null {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return v;
  const n = parseFloat(String(v).replace(/[^0-9.-]/g, ""));
  return Number.isNaN(n) ? null : n;
}

export function toStr(v: Cell): string {
  return v === null || v === undefined ? "" : String(v).trim();
}
