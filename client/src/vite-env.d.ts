/// <reference types="vite/client" />  //

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

interface Restaurant {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name: string;
    amenity: string;
    cuisine?: string;

  }
}

interface ReverseInformation {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    amenity: string;
    house_number: string;
    road: string;
    hamlet: string;
    town: string;
    county: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  },
  boundingbox: [string, string, string, string]
}

interface Event {
  name:      string;
  type:      string;
  id:        string;
  test:      boolean;
  locale:    string;
  images:    Image[];
  distance:  number;
  units:     string;
  dates:     Dates;
  ticketing: Ticketing;
  _links:    EventLinks;
  _embedded: Embedded;
  url:       string;
  isFavorite:boolean;
}

interface Embedded {
  venues: Venue[];
}

interface Venue {
  name:           string;
  type:           string;
  id:             string;
  test:           boolean;
  locale:         string;
  distance:       number;
  units:          string;
  postalCode:     string;
  timezone:       string;
  city:           City;
  state:          State;
  country:        Country;
  address:        Address;
  location:       Location;
  upcomingEvents: UpcomingEvents;
  _links:         VenueLinks;
}

interface VenueLinks {
  self: Self;
}

interface Self {
  href: string;
}

interface Address {
  line1: string;
}

interface City {
  name: string;
}

interface Country {
  name:        string;
  countryCode: string;
}

interface Location {
  longitude: string;
  latitude:  string;
}

interface State {
  name:      string;
  stateCode: string;
}

interface UpcomingEvents {
  archtics:     number;
  ticketmaster: number;
  _total:       number;
  _filtered:    number;
}

interface EventLinks {
  self:   Self;
  venues: Self[];
}

interface Dates {
  start:            Start;
  end:              End;
  timezone:         string;
  status:           Status;
  spanMultipleDays: boolean;
}

interface End {
  localDate:      Date;
  localTime:      string;
  dateTime:       Date;
  approximate:    boolean;
  noSpecificTime: boolean;
}

interface Start {
  localDate:      Date;
  localTime:      string;
  dateTime:       Date;
  dateTBD:        boolean;
  dateTBA:        boolean;
  timeTBA:        boolean;
  noSpecificTime: boolean;
}

interface Status {
  code: string;
}

interface Image {
  ratio:    Ratio;
  url:      string;
  width:    number;
  height:   number;
  fallback: boolean;
}

enum Ratio {
  The16_9 = "16_9",
  The3_2 = "3_2",
  The4_3 = "4_3",
}

interface Ticketing {
  safeTix: SafeTix;
  id:      string;
}

interface SafeTix {
  enabled: boolean;
}

interface FavoriteEvent{
  name: string,
  id?: string,
  url:string,
  locale?: string,
  image:string,
  address?:string,
  distance:number,
  startDate?:Date,
  endDate?:Date,
}