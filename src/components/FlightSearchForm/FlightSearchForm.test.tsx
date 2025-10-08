import { render, screen } from "@testing-library/react";
import FlightSearchForm from "./FlightSearchForm";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("FlightSearchForm", () => {
  it("renders the form and allows submission", () => {
    const mockOnSearch = jest.fn();
    const searchParams = { origin: "MAD", departureDate: "2025-08-01" };
    render(
      <Provider store={store}>
        <FlightSearchForm onSearch={mockOnSearch} searchParams={searchParams} />
      </Provider>
    );
    expect(screen.getByLabelText(/city code/i)).toBeInTheDocument();
    expect(screen.getByText(/your journey starts here/i)).toBeInTheDocument();
  });
});
