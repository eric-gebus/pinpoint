import Element from "./Element";

interface EventImage {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

interface EventDates {
  start: {
    localDate?: string;
    localTime?: string;
    dateTime?: string;
    dateTBD: boolean;
    dateTBA: boolean;
    timeTBA: boolean;
    noSpecificTime: boolean;
  };
  end?: {
    localDate?: string;
    approximate: boolean;
    noSpecificTime: boolean;
  };
  timezone: string;
  status: {
    code: string;
  };
  spanMultipleDays: boolean;
}

interface EventSales {
  public?: {
    startDateTime: string;
    startTBD: boolean;
    startTBA: boolean;
    endDateTime: string;
  };
  presales?: {
    startDateTime: string;
    endDateTime: string;
    name: string;
  }[];
}

interface EventAccessibility {
  info: string;
  ticketLimit?: number;
  accessibleSeatingDetail?: string;
}

interface EventSeatmap {
  staticUrl: string;
  id: string;
}

interface EventPriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

interface EventTicketLimit {
  info: string;
}

interface Event {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: EventImage[];
  distance: number;
  units: string;
  sales?: EventSales;
  dates: EventDates;
  classifications?: unknown;
  accessibility?: EventAccessibility;
  promoter?: unknown;
  promoters?: unknown;
  ticketing?: unknown;
  pleaseNote?: string;
  seatmap?: EventSeatmap;
  priceRanges?: EventPriceRange[];
  ticketLimit?: EventTicketLimit;
  _links?: unknown;
  _embedded?: unknown;
}

interface ListProps {
  events: Event[];
}

function List({ events }: ListProps) {
  return (
    <div className="flex m-2 flex-col gap-2 max-w-md">
      { 
        events.map((event, index) => (
          <Element key={index} event={event}/>
        ))
      }
    </div>
  );
}

export default List;