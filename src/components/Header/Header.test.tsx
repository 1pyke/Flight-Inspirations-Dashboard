import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the logo and title", () => {
    render(<Header />);
    expect(screen.getByText(/flight inspirations/i)).toBeInTheDocument();
    expect(
      screen.getByText(/find your next destination. fly smarter./i)
    ).toBeInTheDocument();
  });
});
