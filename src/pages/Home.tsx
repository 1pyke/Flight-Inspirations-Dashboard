import { useState, lazy, Suspense } from "react";
import { useAppSelector } from "../store/hooks";
import { useTableData } from "../hooks/useTableData";
import Loading from "../components/Loading/Loading";
import "./Home.style.css";

const FlightSearchForm = lazy(
  () => import("../components/FlightSearchForm/FlightSearchForm")
);
const FlightTable = lazy(() => import("../components/FlightTable/FlightTable"));

const Home = () => {
  const [searchParams, setSearchParams] = useState<{
    origin: string;
    departureDate?: string;
  }>({ origin: "MAD" });

  const { data, editedCells, updateCell, saveChanges, debouncedFilter } =
    useTableData(searchParams);

  const loading = useAppSelector((state) => state.flights.loading);
  const error = useAppSelector((state) => state.flights.error);

  const handleFlightSearch = (params: {
    origin: string;
    departureDate?: string;
  }) => {
    setSearchParams(params);
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <FlightSearchForm
          onSearch={handleFlightSearch}
          searchParams={searchParams}
        />
      </Suspense>
      <div className={`home-content-wrapper ${loading ? "loading" : ""}`}>
        {loading ? (
          <Loading />
        ) : !error ? (
          <div>
            <Suspense fallback={<Loading />}>
              <FlightTable
                data={data}
                editedCells={editedCells}
                updateCell={updateCell}
                saveChanges={saveChanges}
                debouncedFilter={debouncedFilter}
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
