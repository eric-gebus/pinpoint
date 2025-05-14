import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";



describe("Navbar Component", () => {
  it("renders all navigation links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Map")).toBeInTheDocument();
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Favs")).toBeInTheDocument();
  });

  it("renders all icons with correct alt text", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByAltText("Map")).toBeInTheDocument();
    expect(screen.getByAltText("List")).toBeInTheDocument();
    expect(screen.getByAltText("Favorites")).toBeInTheDocument();
  });

  it("links navigate to correct routes", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Map").closest("a")).toHaveAttribute(
      "href",
      "/map"
    );
    expect(screen.getByText("List").closest("a")).toHaveAttribute(
      "href",
      "/list"
    );
    expect(screen.getByText("Favs").closest("a")).toHaveAttribute(
      "href",
      "/favorites"
    );
  });
});
