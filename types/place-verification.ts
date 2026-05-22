export type PlaceVerificationStatus = "verified" | "unverified" | "skipped";

export type VerifyPlaceInput = {
  originalName: string;
  city: string;
};

export type VerifiedPlaceResult = {
  originalName: string;
  query: string;
  city: string;
  status: PlaceVerificationStatus;
  googlePlaceId?: string;
  googleMapsUri?: string;
  formattedAddress?: string;
  displayName?: string;
  latitude?: number;
  longitude?: number;
  reason?: string;
};
