import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function fetchCamperById(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/campers/${id}`,
  );
  const data = await response.json();
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Помилка сервера");
  }

  return data;
}
