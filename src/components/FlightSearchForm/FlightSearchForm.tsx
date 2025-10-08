import { memo } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppSelector } from "../../store/hooks";
import { Search, Flight } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { FlightSearchFormProps, FormData } from "./FlightSearchForm.type";
import "./FlightSearchForm.style.css";

const FlightSearchForm = ({
  onSearch,
  searchParams,
}: FlightSearchFormProps) => {
  const loading = useAppSelector((state) => state.flights.loading);
  const error = useAppSelector((state) => state.flights.error);
  const [displayedText, setDisplayedText] = useState("");
  const parseDepartureDateParam = (dateParam?: string): Dayjs | null => {
    if (!dateParam) return null;
    return typeof dateParam === "string" ? dayjs(dateParam) : null;
  };

  const [departureDate, setDepartureDate] = useState<Dayjs | null>(
    parseDepartureDateParam(searchParams.departureDate)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      origin: searchParams.origin || "",
    },
    mode: "onChange",
  });
  const fullText =
    "Whether you're planning a quick getaway or a dream vacation, our platform helps you explore top destinations, uncover exclusive flight offers, and make confident booking decisions through intelligent search and real-time data.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const validateOriginCodeLength = (value: string): string | true => {
    if (value.length !== 3) return "origin must be 3 characters";
    return true;
  };

  const handleDateChange = (newValue: Dayjs | null): void => {
    setDepartureDate(newValue);
  };

  const handleSearchFormSubmit = async (values: FormData): Promise<void> => {
    onSearch({
      origin: values.origin,
      departureDate: departureDate
        ? departureDate.format("YYYY-MM-DD")
        : undefined,
    });
  };

  useEffect(() => {
    setValue("origin", searchParams.origin || "");
    setDepartureDate(parseDepartureDateParam(searchParams.departureDate));
  }, [searchParams, setValue]);

  return (
    <>
      <Container maxWidth="lg" className="flightsearch-container">
        <Box className="flightsearch-header-box">
          <Typography
            variant="h1"
            component="h2"
            className="flightsearch-title"
          >
            Your Journey Starts Here
          </Typography>
        </Box>

        <Typography variant="body1" className="flightsearch-description">
          {displayedText}
        </Typography>
      </Container>
      <form onSubmit={handleSubmit(handleSearchFormSubmit)}>
        <Box className="flightsearch-form-fields">
          <TextField
            fullWidth
            id="origin"
            label="City Code"
            {...register("origin", {
              required: "City Code Is Required",
              validate: validateOriginCodeLength,
            })}
            error={!!errors.origin}
            helperText={errors.origin?.message || ""}
            placeholder="e.g., MAD"
            className="flightsearch-input"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Departure Date"
              value={departureDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  className: "flightsearch-input",
                },
              }}
            />
          </LocalizationProvider>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={loading}
            startIcon={<Search className="flightsearch-submit-icon" />}
            className="flightsearch-submit-btn"
          >
            {loading ? "Searching" : "Search"}
          </Button>
        </Box>
      </form>

      {error && (
        <Box className="error-container flightsearch-error-box">
          <Typography variant="body2" color="error.dark" fontWeight={600}>
            {error}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default memo(FlightSearchForm);
