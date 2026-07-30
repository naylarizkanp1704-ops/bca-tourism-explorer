import { UnavailableState } from "@/components/masterdata/UnavailableState";

export function TravelerTab() {
  return (
    <UnavailableState
      title="Traveler demographic breakdown not yet collected"
      explanation="Age group, gender, travel purpose, companion type, and accommodation preference are published by BPS in the Wisnus Traveler Characteristics module, but individual figures were not pulled into this workbook pass — shown here honestly rather than estimated."
      whatIsAvailable="Available today at national level: total trips (1.02B, 2024), average spend/trip (Rp2.32Jt), average length of stay (3.74 nights). See 01_Indicator_Roadmap in the workbook for the exact BPS source to pull next."
    />
  );
}
