export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = "owner" | "investor" | "admin";
export type CurrencyCode = "NZD" | "USD" | "AUD" | "GBP";
export type HorseSex =
  | "colt"
  | "filly"
  | "gelding"
  | "horse"
  | "mare"
  | "unknown";
export type ListingStatus =
  | "draft"
  | "review"
  | "published"
  | "paused"
  | "closed"
  | "sold_out";
export type OfferStatus =
  | "submitted"
  | "countered"
  | "accepted"
  | "declined"
  | "withdrawn"
  | "expired";
export type TransactionStatus =
  | "payment_instruction_required"
  | "instructions_sent"
  | "funds_received"
  | "settled"
  | "cancelled";
export type OfferingStructure =
  | "equity-stake"
  | "lease-share"
  | "synthetic-demo";
export type MediaKind = "image" | "video";
export type DocumentKind = "source" | "offering-brief" | "terms";
export type OfferEventType =
  | "submitted"
  | "countered"
  | "accepted"
  | "declined"
  | "instructions_sent"
  | "funds_received"
  | "settled";

type Table<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type HorseRow = {
  colour: string | null;
  created_at: string;
  damsire: string | null;
  dam: string | null;
  foaled_on: string | null;
  highlight_text: string | null;
  id: string;
  location: string | null;
  name: string;
  overview: string | null;
  pedigree_notes: string | null;
  sex: HorseSex;
  sire: string | null;
  slug: string;
  source_notes: string | null;
  source_reference_label: string | null;
  source_reference_url: string | null;
  trainer_name: string | null;
  updated_at: string;
  vendor_name: string | null;
};

type HorseInsert = {
  colour?: string | null;
  created_at?: string;
  damsire?: string | null;
  dam?: string | null;
  foaled_on?: string | null;
  highlight_text?: string | null;
  id?: string;
  location?: string | null;
  name: string;
  overview?: string | null;
  pedigree_notes?: string | null;
  sex?: HorseSex;
  sire?: string | null;
  slug: string;
  source_notes?: string | null;
  source_reference_label?: string | null;
  source_reference_url?: string | null;
  trainer_name?: string | null;
  updated_at?: string;
  vendor_name?: string | null;
};

type ListingDocumentRow = {
  created_at: string;
  external_url: string | null;
  id: string;
  kind: DocumentKind;
  listing_id: string;
  sort_order: number;
  storage_bucket: string | null;
  storage_path: string | null;
  title: string;
};

type ListingDocumentInsert = {
  created_at?: string;
  external_url?: string | null;
  id?: string;
  kind?: DocumentKind;
  listing_id: string;
  sort_order?: number;
  storage_bucket?: string | null;
  storage_path?: string | null;
  title: string;
};

type ListingMediaRow = {
  alt_text: string | null;
  created_at: string;
  id: string;
  is_cover: boolean;
  kind: MediaKind;
  listing_id: string;
  sort_order: number;
  url: string;
};

type ListingMediaInsert = {
  alt_text?: string | null;
  created_at?: string;
  id?: string;
  is_cover?: boolean;
  kind?: MediaKind;
  listing_id: string;
  sort_order?: number;
  url: string;
};

type ListingRow = {
  created_at: string;
  estimated_monthly_fee_nzd: number | null;
  headline: string;
  horse_id: string;
  id: string;
  minimum_purchase_percentage: number;
  offer_notes: string | null;
  offering_structure: OfferingStructure;
  owner_profile_id: string;
  percentage_available: number;
  price_per_percentage_nzd: number;
  published_at: string | null;
  slug: string;
  status: ListingStatus;
  summary: string | null;
  updated_at: string;
};

type ListingInsert = {
  created_at?: string;
  estimated_monthly_fee_nzd?: number | null;
  headline: string;
  horse_id: string;
  id?: string;
  minimum_purchase_percentage: number;
  offer_notes?: string | null;
  offering_structure?: OfferingStructure;
  owner_profile_id: string;
  percentage_available: number;
  price_per_percentage_nzd: number;
  published_at?: string | null;
  slug: string;
  status?: ListingStatus;
  summary?: string | null;
  updated_at?: string;
};

type OfferEventRow = {
  actor_profile_id: string | null;
  created_at: string;
  event_type: OfferEventType;
  id: string;
  notes: string | null;
  offer_id: string;
  payload: Json | null;
};

type OfferEventInsert = {
  actor_profile_id?: string | null;
  created_at?: string;
  event_type: OfferEventType;
  id?: string;
  notes?: string | null;
  offer_id: string;
  payload?: Json | null;
};

type OfferRow = {
  counter_message: string | null;
  counter_percentage_of_horse: number | null;
  counter_price_per_percentage_nzd: number | null;
  counter_total_nzd: number | null;
  countered_at: string | null;
  created_at: string;
  display_currency: CurrencyCode;
  display_currency_rate: number | null;
  display_total_amount: number | null;
  expires_at: string | null;
  fees_nzd: number;
  horse_id: string;
  id: string;
  investor_profile_id: string;
  listing_id: string;
  message: string | null;
  offered_percentage: number;
  owner_profile_id: string;
  reviewed_at: string | null;
  status: OfferStatus;
  submitted_at: string;
  total_offer_nzd: number;
  updated_at: string;
};

type OfferInsert = {
  counter_message?: string | null;
  counter_percentage_of_horse?: number | null;
  counter_price_per_percentage_nzd?: number | null;
  counter_total_nzd?: number | null;
  countered_at?: string | null;
  created_at?: string;
  display_currency?: CurrencyCode;
  display_currency_rate?: number | null;
  display_total_amount?: number | null;
  expires_at?: string | null;
  fees_nzd?: number;
  horse_id: string;
  id?: string;
  investor_profile_id: string;
  listing_id: string;
  message?: string | null;
  offered_percentage: number;
  owner_profile_id: string;
  reviewed_at?: string | null;
  status?: OfferStatus;
  submitted_at?: string;
  total_offer_nzd: number;
  updated_at?: string;
};

type OwnershipPositionRow = {
  average_cost_nzd: number | null;
  created_at: string;
  horse_id: string;
  id: string;
  percentage_owned: number;
  profile_id: string;
  updated_at: string;
};

type OwnershipPositionInsert = {
  average_cost_nzd?: number | null;
  created_at?: string;
  horse_id: string;
  id?: string;
  percentage_owned?: number;
  profile_id: string;
  updated_at?: string;
};

type ProfileRow = {
  auth_user_id: string | null;
  bio: string | null;
  company_name: string | null;
  created_at: string;
  display_name: string;
  email: string | null;
  full_name: string | null;
  id: string;
  onboarding_complete: boolean;
  phone: string | null;
  preferred_display_currency: CurrencyCode;
  role: AppRole;
  updated_at: string;
};

type ProfileInsert = {
  auth_user_id?: string | null;
  bio?: string | null;
  company_name?: string | null;
  created_at?: string;
  display_name: string;
  email?: string | null;
  full_name?: string | null;
  id?: string;
  onboarding_complete?: boolean;
  phone?: string | null;
  preferred_display_currency?: CurrencyCode;
  role: AppRole;
  updated_at?: string;
};

type TransactionRow = {
  cancelled_at: string | null;
  created_at: string;
  funds_received_at: string | null;
  horse_id: string;
  id: string;
  instruction_due_at: string | null;
  instructions_summary: string | null;
  investor_profile_id: string;
  listing_id: string;
  offer_id: string;
  owner_profile_id: string;
  payment_provider: string | null;
  payment_reference: string | null;
  settled_at: string | null;
  state: TransactionStatus;
  updated_at: string;
};

type TransactionInsert = {
  cancelled_at?: string | null;
  created_at?: string;
  funds_received_at?: string | null;
  horse_id: string;
  id?: string;
  instruction_due_at?: string | null;
  instructions_summary?: string | null;
  investor_profile_id: string;
  listing_id: string;
  offer_id: string;
  owner_profile_id: string;
  payment_provider?: string | null;
  payment_reference?: string | null;
  settled_at?: string | null;
  state?: TransactionStatus;
  updated_at?: string;
};

export interface Database {
  public: {
    Tables: {
      horses: Table<HorseRow, HorseInsert, Partial<HorseInsert>>;
      listing_documents: Table<
        ListingDocumentRow,
        ListingDocumentInsert,
        Partial<ListingDocumentInsert>
      >;
      listing_media: Table<
        ListingMediaRow,
        ListingMediaInsert,
        Partial<ListingMediaInsert>
      >;
      listings: Table<ListingRow, ListingInsert, Partial<ListingInsert>>;
      offer_events: Table<OfferEventRow, OfferEventInsert, Partial<OfferEventInsert>>;
      offers: Table<OfferRow, OfferInsert, Partial<OfferInsert>>;
      ownership_positions: Table<
        OwnershipPositionRow,
        OwnershipPositionInsert,
        Partial<OwnershipPositionInsert>
      >;
      profiles: Table<ProfileRow, ProfileInsert, Partial<ProfileInsert>>;
      transactions: Table<
        TransactionRow,
        TransactionInsert,
        Partial<TransactionInsert>
      >;
    };
    Views: Record<string, never>;
    Functions: {
      current_profile_id: {
        Args: Record<PropertyKey, never>;
        Returns: string | null;
      };
      current_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: AppRole | null;
      };
    };
    Enums: {
      app_role: AppRole;
      currency_code: CurrencyCode;
      document_kind: DocumentKind;
      horse_sex: HorseSex;
      listing_status: ListingStatus;
      media_kind: MediaKind;
      offer_event_type: OfferEventType;
      offer_status: OfferStatus;
      offering_structure: OfferingStructure;
      transaction_status: TransactionStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
