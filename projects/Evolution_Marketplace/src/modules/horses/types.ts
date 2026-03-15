import type { HorseSex } from "@/types/database";

export interface HorseRecord {
  id: string;
  slug: string;
  name: string;
  sire: string | null;
  dam: string | null;
  damsire: string | null;
  sex: HorseSex;
  foaledOn: string | null;
  colour: string | null;
  trainerName: string | null;
  vendorName: string | null;
  location: string | null;
  overview: string | null;
  pedigreeNotes: string | null;
  highlightText: string | null;
  sourceReferenceLabel: string | null;
  sourceReferenceUrl: string | null;
  sourceNotes: string | null;
}
