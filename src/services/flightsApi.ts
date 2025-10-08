import axios from "axios";
import axiosConfig from "../config/axiosConfig";
import { FlightsResponse } from "../types/flightsTypes";
import { getCachedData, setCachedData } from "../utils/cacheUtils";
import { FLIGHT_DESTINATIONS_ENDPOINT, TOKEN_ENDPOINT } from "../constants";

export const getAmadeusAuthToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${axiosConfig.API_BASE_URL}${TOKEN_ENDPOINT}`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: axiosConfig.API_KEY,
        client_secret: axiosConfig.API_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to fetch token:", error);
    throw new Error("Unable to authenticate with Amadeus API.");
  }
};

export const searchFlightDestinations = async (
  token: string,
  origin: string,
  departureDate?: string
): Promise<FlightsResponse> => {
  const cacheKey = "flights";
  const cacheParams = { origin, departureDate };

  const cached = getCachedData<FlightsResponse>(
    cacheKey,
    axiosConfig.CACHE_TTL,
    cacheParams
  );
  if (cached) {
    return cached;
  }

  try {
    const response = await axios.get(
      `${axiosConfig.API_BASE_URL}${FLIGHT_DESTINATIONS_ENDPOINT}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          origin,
          ...(departureDate ? { departureDate } : {}),
        },
      }
    );

    setCachedData(cacheKey, cacheParams, response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch flights:", error);
    throw new Error("Unable to retrieve flight data.");
  }
};

export default {
  getAmadeusAuthToken,
  searchFlightDestinations,
};
