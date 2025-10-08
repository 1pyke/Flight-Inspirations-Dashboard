import { useState, useEffect, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";
import { TableData } from "../types/tableTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchFlightInspirations } from "../store/flightsSlice";
import { getCachedData, setCachedData } from "../utils/cacheUtils";
import { CACHE_KEY, CACHE_TTL } from "../constants";

export const useTableData = (searchParams: {
  origin: string;
  departureDate?: string;
}) => {
  const dispatch = useAppDispatch();
  const flights = useAppSelector((state) => state.flights.flights);
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {}
  );
  const [localData, setLocalData] = useState<TableData[]>([]);
  const saveChanges = useCallback(() => {
    setEditedCells(new Set());
    setCachedData(CACHE_KEY, searchParams, localData);
  }, [searchParams, localData]);

  const updateCell = useCallback(
    (originalIndex: number, columnId: string, value: string) => {
      const updatedData = [...localData];
      updatedData[originalIndex] = {
        ...updatedData[originalIndex],
        [columnId]: value,
      };
      setLocalData(updatedData);
      setEditedCells((prev) =>
        new Set(prev).add(`${originalIndex}-${columnId}`)
      );
    },
    [localData]
  );

  const debouncedFilter = useMemo(
    () =>
      debounce((column: string, value: string) => {
        setColumnFilters((prev) => ({
          ...prev,
          [column]: value,
        }));
      }, 300),
    []
  );

  const filteredData = useMemo(() => {
    return localData.filter((row) => {
      return Object.entries(columnFilters).every(([column, filterValue]) => {
        const value = row[column as keyof TableData];
        if (typeof value === "string") {
          return value.toLowerCase().includes(filterValue.toLowerCase());
        } else if (typeof value === "object" && value !== null) {
          if ("total" in value) {
            return value.total
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          }
          return JSON.stringify(value)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }, [localData, columnFilters]);

  useEffect(() => {
    const cached = getCachedData<TableData[]>(CACHE_KEY, CACHE_TTL, searchParams);
    if (cached) {
      setLocalData(cached);
    } else {
      dispatch(fetchFlightInspirations(searchParams));
    }
    setEditedCells(new Set());
  }, [dispatch, searchParams]);

  
  useEffect(() => {
    const cached = getCachedData<TableData[]>(CACHE_KEY, CACHE_TTL, searchParams);
    if (!cached && flights.length > 0) {
      setLocalData(flights);
    }
  }, [flights, searchParams]);

  return {
    data: filteredData,
    editedCells,
    updateCell,
    saveChanges,
    debouncedFilter,
  };
};
