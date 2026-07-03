export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: "alcove" | "panel_van" | "integrated" | "semi_integrated";
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: "automatic" | "manual";
  engine: "diesel" | "petrol" | "hybrid" | "electric";
  amenities: string[];
  coverImage: string;
  totalReviews: number;
  description: string;
}

export interface CamperListResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface CamperFilters {
  location?: string;
  form?: "alcove" | "panel_van" | "integrated" | "semi_integrated";
  transmission?: "automatic" | "manual";
  engine?: "diesel" | "petrol" | "hybrid" | "electric";
}
