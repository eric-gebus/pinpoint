import { render} from "@testing-library/react";
import { describe, beforeAll } from "vitest";
import "@testing-library/jest-dom/vitest";
import Weather from "./Weather";


describe ("Weather", () => {
  beforeAll(() => {
    render(<Weather position={[51.5074, -0.1278]}/>)
  });
})

