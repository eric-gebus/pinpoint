import { render, screen} from "@testing-library/react";
import { describe, beforeAll, expect, it} from "vitest";
import "@testing-library/jest-dom/vitest";
import Weather from "./Weather";



describe ("Weather", () => {
  beforeAll(() => {
    render(<Weather position={[51.5074, -0.1278]}/>)
  });


  it("renders left Chevron", () => {
    expect(screen.getByTestId("left-arrow")).toBeInTheDocument();
  })

  it("renders right Chevron", () => {
    expect(screen.getByTestId("right-arrow")).toBeInTheDocument();
  })

})


