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

interface ElementProps {
  event: Event;
}

function Element({ event }: ElementProps) {
  return (
    <div className="rounded-lg flex bg-gray-100 p-4 flex-col">
      <div className="flex flex-row">
        <img src={event.images[0].url} className="w-[75px] h-[75px]"/>
        <div>
          <h1 className="text-xl font-semibold align-middle m-2">{event.name}</h1>
          <h2 className="text-xl font-light align-middle m-2">{event.distance}km away</h2>
          <a href={event.url}>
            <h2 className="text-xl font-light align-middle m-2 text-blue-600">Click for more information</h2>
          </a>
        </div> 
      </div>
    </div>
  );
}

export default Element;