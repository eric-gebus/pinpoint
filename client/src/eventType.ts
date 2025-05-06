export interface Event {
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
}

export interface Embedded {
    venues: Venue[];
}

export interface Venue {
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

export interface VenueLinks {
    self: Self;
}

export interface Self {
    href: string;
}

export interface Address {
    line1: string;
}

export interface City {
    name: string;
}

export interface Country {
    name:        string;
    countryCode: string;
}

export interface Location {
    longitude: string;
    latitude:  string;
}

export interface State {
    name:      string;
    stateCode: string;
}

export interface UpcomingEvents {
    archtics:     number;
    ticketmaster: number;
    _total:       number;
    _filtered:    number;
}

export interface EventLinks {
    self:   Self;
    venues: Self[];
}

export interface Dates {
    start:            Start;
    end:              End;
    timezone:         string;
    status:           Status;
    spanMultipleDays: boolean;
}

export interface End {
    localDate:      Date;
    localTime:      string;
    dateTime:       Date;
    approximate:    boolean;
    noSpecificTime: boolean;
}

export interface Start {
    localDate:      Date;
    localTime:      string;
    dateTime:       Date;
    dateTBD:        boolean;
    dateTBA:        boolean;
    timeTBA:        boolean;
    noSpecificTime: boolean;
}

export interface Status {
    code: string;
}

export interface Image {
    ratio:    Ratio;
    url:      string;
    width:    number;
    height:   number;
    fallback: boolean;
}

export enum Ratio {
    The16_9 = "16_9",
    The3_2 = "3_2",
    The4_3 = "4_3",
}

export interface Ticketing {
    safeTix: SafeTix;
    id:      string;
}

export interface SafeTix {
    enabled: boolean;
}
