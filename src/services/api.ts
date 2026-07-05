import axios, { AxiosError } from "axios";
import { Review, BookingData } from "@/types/camper";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function fetchCamperById(id: string) {
  try {
    const { data } = await api.get(`/campers/${id}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return null;
    }
    throw new Error("Server error");
  }
}

export const fetchReviewsByCamperId = async (id: string): Promise<Review[]> => {
  const { data } = await api.get(`/campers/${id}/reviews`);
  return data;
};

export const sendBookingRequest = async (
  id: string,
  bookingData: BookingData,
) => {
  const { data } = await api.post(
    `/campers/${id}/booking-requests`,
    bookingData,
  );
  return data;
};
