import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchFlightDestinations, getAmadeusAuthToken } from "../services/flightsApi";
import { formatNameToTitleCase } from "../utils/tableUtils";
import { Flight } from "../types/flightsTypes";
import { FlightsState } from "./types";

const initialState: FlightsState = {
  flights: [],
  loading: false,
  error: null,
  dictionaries: null,
  meta: null,
  currency: "",
};

export const fetchFlightInspirations = createAsyncThunk(
  "flights/fetchFlightInspirations",
  async (
    { origin, departureDate }: { origin: string; departureDate?: string },
    { rejectWithValue }
  ) => {
    try {
      const token = await getAmadeusAuthToken();
      const response = await searchFlightDestinations(token, origin, departureDate);
      return response;
    } catch (error) {
      return rejectWithValue(
        "Sorry, we couldn't complete your search. Make sure all fields are filled correctly and give it another try."
      );
    }
  }
);

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightInspirations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlightInspirations.fulfilled, (state, action) => {
        const { data, dictionaries, meta } = action.payload;

        state.dictionaries = dictionaries;
        state.meta = meta;
        state.currency = meta.currency;

        state.flights = data.map((flight: Flight, index: number) => {
          const originLocation = dictionaries.locations?.[flight.origin];
          const destinationLocation =
            dictionaries.locations?.[flight.destination];

          return {
            originalIndex: index,
            origin: originLocation
              ? `${flight.origin} - ${formatNameToTitleCase(
                  originLocation.detailedName
                )}`
              : flight.origin,
            destination: destinationLocation
              ? `${flight.destination} - ${formatNameToTitleCase(
                  destinationLocation.detailedName
                )}`
              : flight.destination,
            price: flight.price,
            departureDate: flight.departureDate,
            returnDate: flight.returnDate,
          };
        });

        state.loading = false;
      })
      .addCase(fetchFlightInspirations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default flightsSlice.reducer;
