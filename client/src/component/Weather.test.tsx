import { render, screen} from "@testing-library/react";
import { describe, beforeAll, expect, it, test, expectTypeOf } from "vitest";
import "@testing-library/jest-dom/vitest";
import Weather from "./Weather";
import { fetchWeatherApi } from "openmeteo";
import { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response";

const BEFORE_ALL_TIMEOUT = 30000;
const position = [51.5074, -0.1278]

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

describe('Request Weather API', () => {

  beforeAll(async () => {
    const params = {
      "latitude": position[0],
      "longitude": position[1],
      "hourly": ["temperature_2m", "weather_code", "precipitation_probability"],
      "timezone": "auto",
    };

    const url = "https://api.open-meteo.com/v1/forecast";

    const response = await fetchWeatherApi(url, params);

  }, BEFORE_ALL_TIMEOUT);



  // test('Should have response status 200', () => {
  //   expect(response.status).toBe(200);

  // test('Should have content-type', () => {
  //   expect(response.headers.get('Content-Type')).toBe('application/json');
  // })

  // test('Should hgave array in the body', () => {
  //   expectTypeOf(body).toBeArray();
  // })
// })

})

