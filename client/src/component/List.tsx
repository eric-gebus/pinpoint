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

// REMOVE 
const mockEvents: Event[] = [
    {    "name": "Billie Marten: Dog Eared Tour 2025",    "type": "event",    "id": "Z698xZQpZ1kF4fvAA",    "test": false,    "url": "https://www.ticketmaster.pl/event/billie-marten-dog-eared-tour-2025-tickets/215501145?language=en-us",    "locale": "en-us",    "images": [      {        "ratio": "3_2",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_ARTIST_PAGE_3_2.jpg",        "width": 305,        "height": 203,        "fallback": false      },      {        "ratio": "16_9",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_SOURCE",        "width": 2426,        "height": 1365,        "fallback": false      },      {        "ratio": "3_2",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_TABLET_LANDSCAPE_3_2.jpg",        "width": 1024,        "height": 683,        "fallback": false      },      {        "ratio": "4_3",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_CUSTOM.jpg",        "width": 305,        "height": 225,        "fallback": false      },      {        "ratio": "16_9",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_RECOMENDATION_16_9.jpg",        "width": 100,        "height": 56,        "fallback": false      },      {        "ratio": "16_9",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_EVENT_DETAIL_PAGE_16_9.jpg",        "width": 205,        "height": 115,        "fallback": false      },      {        "ratio": "16_9",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_TABLET_LANDSCAPE_LARGE_16_9.jpg",        "width": 2048,        "height": 1152,        "fallback": false      },      {        "ratio": "3_2",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_RETINA_PORTRAIT_3_2.jpg",        "width": 640,        "height": 427,        "fallback": false      },      {        "ratio": "16_9",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_TABLET_LANDSCAPE_16_9.jpg",        "width": 1024,        "height": 576,        "fallback": false      },      {        "ratio": "16_9",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_RETINA_PORTRAIT_16_9.jpg",        "width": 640,        "height": 360,        "fallback": false      },      {        "ratio": "16_9",        "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_RETINA_LANDSCAPE_16_9.jpg",        "width": 1136,        "height": 639,        "fallback": false      }    ],    "distance": 4152.13,    "units": "KILOMETERS",    "sales": {      "public": {        "startDateTime": "2025-03-20T10:00:00Z",        "startTBD": false,        "startTBA": false,        "endDateTime": "2025-10-21T18:00:00Z"      }    },    "dates": {      "start": {        "localDate": "2025-10-21",        "localTime": "18:00:00",        "dateTime": "2025-10-21T16:00:00Z",        "dateTBD": false,        "dateTBA": false,        "timeTBA": false,        "noSpecificTime": false      },      "timezone": "Europe/Warsaw",      "status": {        "code": "onsale"      },      "spanMultipleDays": false    },    "classifications": [      {        "primary": true,        "segment": {          "id": "KZFzniwnSyZfZ7v7nJ",          "name": "Music"        },        "genre": {          "id": "KnvZfZ7vAva",          "name": "Folk"        },        "subGenre": {          "id": "KZazBEonSMnZfZ7vAn7",          "name": "Folk"        },        "family": false      }    ],    "promoter": {      "id": "31",      "name": "Live Nation Sp. z o.o."    },    "promoters": [      {        "id": "31",        "name": "Live Nation Sp. z o.o."      }    ],    "seatmap": {      "staticUrl": "https://media.ticketmaster.eu/poland/6755dffd28d31a44815da8687b1c0446.jpg",      "id": "seatmap"    },    "ticketing": {      "safeTix": {        "enabled": false      },      "id": "ticketing"    },    "_links": {      "self": {        "href": "/discovery/v2/events/Z698xZQpZ1kF4fvAA?locale=en-us"      },      "attractions": [        {          "href": "/discovery/v2/attractions/K8vZ917fgB7?locale=en-us"        }      ],      "venues": [        {          "href": "/discovery/v2/venues/Z198xZQpZeae?locale=en-us"        }      ]    },    "_embedded": {      "venues": [        {          "name": "Klub Hybrydy",          "type": "venue",          "id": "Z198xZQpZeae",          "test": false,          "url": "https://www.ticketmaster.pl/venue/klub-hybrydy-warszawa--bilety/hyb/105",          "locale": "en-us",          "distance": 4152.13,          "units": "KILOMETERS",          "postalCode": "00-019",          "timezone": "Europe/Warsaw",          "city": {            "name": "Warsaw"          },          "state": {            "name": "Mazowieckie"          },          "country": {            "name": "Poland",            "countryCode": "PL"          },          "address": {            "line1": "ul. Złota 7/9"          },          "location": {            "longitude": "21.0115",            "latitude": "52.23274"          },          "upcomingEvents": {            "mfx-pl": 9,            "_total": 9,            "_filtered": 0          },          "_links": {            "self": {              "href": "/discovery/v2/venues/Z198xZQpZeae?locale=en-us"            }          }        }      ],      "attractions": [        {          "name": "Billie Marten",          "type": "attraction",          "id": "K8vZ917fgB7",          "test": false,          "url": "https://www.ticketmaster.com/billie-marten-tickets/artist/2253363",          "locale": "en-us",          "externalLinks": {            "youtube": [              {                "url": "https://www.youtube.com/channel/UC7B-nApg76kClvW-YBYezQQ"              }            ],            "twitter": [              {                "url": "https://twitter.com/BillieMarten"              }            ],            "itunes": [              {                "url": "https://music.apple.com/ca/artist/billie-marten/879538438"              }            ],            "spotify": [              {                "url": "https://open.spotify.com/artist/02YLJJnWC7YQVixkjEBRn7?autoplay=true"              }            ],            "facebook": [              {                "url": "https://www.facebook.com/billiemarten"              }            ],            "instagram": [              {                "url": "https://www.instagram.com/billiemarten/"              }            ],            "musicbrainz": [              {                "id": "f5d276c8-8407-45c0-8b1c-4e43c6694fa9",                "url": "https://musicbrainz.org/artist/f5d276c8-8407-45c0-8b1c-4e43c6694fa9"              }            ],            "homepage": [              {                "url": "http://www.billiemarten.com/"              }            ]          },          "images": [            {              "ratio": "3_2",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_ARTIST_PAGE_3_2.jpg",              "width": 305,              "height": 203,              "fallback": false            },            {              "ratio": "16_9",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_SOURCE",              "width": 2426,              "height": 1365,              "fallback": false            },            {              "ratio": "3_2",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_TABLET_LANDSCAPE_3_2.jpg",              "width": 1024,              "height": 683,              "fallback": false            },            {              "ratio": "4_3",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_CUSTOM.jpg",              "width": 305,              "height": 225,              "fallback": false            },            {              "ratio": "16_9",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_RECOMENDATION_16_9.jpg",              "width": 100,              "height": 56,              "fallback": false            },            {              "ratio": "16_9",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_EVENT_DETAIL_PAGE_16_9.jpg",              "width": 205,              "height": 115,              "fallback": false            },            {              "ratio": "16_9",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_TABLET_LANDSCAPE_LARGE_16_9.jpg",              "width": 2048,              "height": 1152,              "fallback": false            },            {              "ratio": "3_2",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_RETINA_PORTRAIT_3_2.jpg",              "width": 640,              "height": 427,              "fallback": false            },            {              "ratio": "16_9",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_TABLET_LANDSCAPE_16_9.jpg",              "width": 1024,              "height": 576,              "fallback": false            },            {              "ratio": "16_9",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_RETINA_PORTRAIT_16_9.jpg",              "width": 640,              "height": 360,              "fallback": false            },            {              "ratio": "16_9",              "url": "https://s1.ticketm.net/dam/a/25f/48cda239-5611-4579-bbd7-352bd0f1425f_RETINA_LANDSCAPE_16_9.jpg",              "width": 1136,              "height": 639,              "fallback": false            }          ],          "classifications": [            {              "primary": true,              "segment": {                "id": "KZFzniwnSyZfZ7v7nJ",                "name": "Music"              },              "genre": {                "id": "KnvZfZ7vAva",                "name": "Folk"              },              "subGenre": {                "id": "KZazBEonSMnZfZ7vAn7",                "name": "Folk"              },              "type": {                "id": "KZAyXgnZfZ7v7nI",                "name": "Undefined"              },              "subType": {                "id": "KZFzBErXgnZfZ7v7lJ",                "name": "Undefined"              },              "family": false            }          ],          "upcomingEvents": {            "mfx-dk": 1,            "mfx-at": 1,            "tmr": 4,            "mfx-nl": 1,            "ticketmaster": 17,            "ticketweb": 2,            "mfx-no": 2,            "mfx-pl": 1,            "_total": 29,            "_filtered": 0          },          "_links": {            "self": {              "href": "/discovery/v2/attractions/K8vZ917fgB7?locale=en-us"            }          }        }      ]    }  },
    {
      "name": "Pavlov's Dog (usa)",
      "type": "event",
      "id": "Z698xZG2ZaCgS",
      "test": false,
      "url": "https://www.ticketmaster.be/event/pavlovs-dog-usa--tickets/60787",
      "locale": "en-us",
      "images": [
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_RETINA_PORTRAIT_16_9.jpg",
          "width": 640,
          "height": 360,
          "fallback": false
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_EVENT_DETAIL_PAGE_16_9.jpg",
          "width": 205,
          "height": 115,
          "fallback": false
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_TABLET_LANDSCAPE_LARGE_16_9.jpg",
          "width": 2048,
          "height": 1152,
          "fallback": false
        },
        {
          "ratio": "3_2",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_RETINA_PORTRAIT_3_2.jpg",
          "width": 640,
          "height": 427,
          "fallback": false
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_RECOMENDATION_16_9.jpg",
          "width": 100,
          "height": 56,
          "fallback": false
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_SOURCE",
          "width": 2426,
          "height": 1365,
          "fallback": false
        },
        {
          "ratio": "4_3",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_CUSTOM.jpg",
          "width": 305,
          "height": 225,
          "fallback": false
        },
        {
          "ratio": "3_2",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_ARTIST_PAGE_3_2.jpg",
          "width": 305,
          "height": 203,
          "fallback": false
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_TABLET_LANDSCAPE_16_9.jpg",
          "width": 1024,
          "height": 576,
          "fallback": false
        },
        {
          "ratio": "16_9",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_RETINA_LANDSCAPE_16_9.jpg",
          "width": 1136,
          "height": 639,
          "fallback": false
        },
        {
          "ratio": "3_2",
          "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_TABLET_LANDSCAPE_3_2.jpg",
          "width": 1024,
          "height": 683,
          "fallback": false
        }
      ],
      "distance": 5216.49,
      "units": "KILOMETERS",
      "sales": {
        "public": {
          "startDateTime": "2024-02-23T10:09:00Z",
          "startTBD": false,
          "startTBA": false,
          "endDateTime": "2025-03-28T16:00:00Z"
        }
      },
      "dates": {
        "start": {
          "localDate": "2025-05-26",
          "localTime": "20:00:00",
          "dateTime": "2025-05-26T18:00:00Z",
          "dateTBD": false,
          "dateTBA": false,
          "timeTBA": false,
          "noSpecificTime": false
        },
        "timezone": "Europe/Brussels",
        "status": {
          "code": "rescheduled"
        },
        "spanMultipleDays": false
      },
      "classifications": [
        {
          "primary": true,
          "segment": {
            "id": "KZFzniwnSyZfZ7v7nJ",
            "name": "Music"
          },
          "genre": {
            "id": "KnvZfZ7vAeA",
            "name": "Rock"
          },
          "subGenre": {
            "id": "KZazBEonSMnZfZ7v6F1",
            "name": "Pop"
          },
          "family": false
        }
      ],
      "promoter": {
        "id": "2975",
        "name": "Look At Music ASBL"
      },
      "promoters": [
        {
          "id": "2975",
          "name": "Look At Music ASBL"
        }
      ],
      "ticketing": {
        "safeTix": {
          "enabled": false
        },
        "id": "ticketing"
      },
      "_links": {
        "self": {
          "href": "/discovery/v2/events/Z698xZG2ZaCgS?locale=en-us"
        },
        "attractions": [
          {
            "href": "/discovery/v2/attractions/K8vZ917Krd7?locale=en-us"
          },
          {
            "href": "/discovery/v2/attractions/K8vZ91721O7?locale=en-us"
          }
        ],
        "venues": [
          {
            "href": "/discovery/v2/venues/Za98xZG2Z67?locale=en-us"
          }
        ]
      },
      "_embedded": {
        "venues": [
          {
            "name": "Spirit of 66",
            "type": "venue",
            "id": "Za98xZG2Z67",
            "test": false,
            "url": "https://www.ticketmaster.be/venue/spirit-of-66-verviers-tickets/spi/101",
            "locale": "en-us",
            "images": [
              {
                "ratio": "16_9",
                "url": "https://media.ticketmaster.eu/belgium/b1788c3c8a28286df110422a8dbdbda3.jpg",
                "width": 205,
                "height": 115,
                "fallback": false
              }
            ],
            "distance": 5216.49,
            "units": "KILOMETERS",
            "postalCode": "4800",
            "timezone": "Europe/Brussels",
            "city": {
              "name": "Verviers"
            },
            "country": {
              "name": "Belgium",
              "countryCode": "BE"
            },
            "address": {
              "line1": "Place du Martyr, 16"
            },
            "location": {
              "longitude": "5.86109",
              "latitude": "50.59353"
            },
            "upcomingEvents": {
              "mfx-be": 63,
              "_total": 63,
              "_filtered": 0
            },
            "_links": {
              "self": {
                "href": "/discovery/v2/venues/Za98xZG2Z67?locale=en-us"
              }
            }
          }
        ],
        "attractions": [
          {
            "name": "Pavlov's Dog",
            "type": "attraction",
            "id": "K8vZ917Krd7",
            "test": false,
            "url": "https://www.ticketmaster.com/pavlovs-dog-tickets/artist/2122682",
            "locale": "en-us",
            "externalLinks": {
              "itunes": [
                {
                  "url": "https://music.apple.com/us/artist/pavlovs-dog/302985967"
                }
              ],
              "spotify": [
                {
                  "url": "https://open.spotify.com/artist/3ZTpSMKKljfomqVgeJGwDL"
                }
              ],
              "facebook": [
                {
                  "url": "https://www.facebook.com/pavlovsdogband/"
                }
              ],
              "instagram": [
                {
                  "url": "https://www.instagram.com/pavlovsdogofficial/"
                }
              ],
              "homepage": [
                {
                  "url": "https://www.davidsurkamp.com/"
                }
              ]
            },
            "images": [
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_RETINA_PORTRAIT_16_9.jpg",
                "width": 640,
                "height": 360,
                "fallback": false
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_EVENT_DETAIL_PAGE_16_9.jpg",
                "width": 205,
                "height": 115,
                "fallback": false
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                "width": 2048,
                "height": 1152,
                "fallback": false
              },
              {
                "ratio": "3_2",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_RETINA_PORTRAIT_3_2.jpg",
                "width": 640,
                "height": 427,
                "fallback": false
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_RECOMENDATION_16_9.jpg",
                "width": 100,
                "height": 56,
                "fallback": false
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_SOURCE",
                "width": 2426,
                "height": 1365,
                "fallback": false
              },
              {
                "ratio": "4_3",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_CUSTOM.jpg",
                "width": 305,
                "height": 225,
                "fallback": false
              },
              {
                "ratio": "3_2",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_ARTIST_PAGE_3_2.jpg",
                "width": 305,
                "height": 203,
                "fallback": false
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_TABLET_LANDSCAPE_16_9.jpg",
                "width": 1024,
                "height": 576,
                "fallback": false
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_RETINA_LANDSCAPE_16_9.jpg",
                "width": 1136,
                "height": 639,
                "fallback": false
              },
              {
                "ratio": "3_2",
                "url": "https://s1.ticketm.net/dam/a/e56/b01ec555-c32f-4a76-bdd3-76c28d264e56_TABLET_LANDSCAPE_3_2.jpg",
                "width": 1024,
                "height": 683,
                "fallback": false
              }
            ],
            "classifications": [
              {
                "primary": true,
                "segment": {
                  "id": "KZFzniwnSyZfZ7v7nJ",
                  "name": "Music"
                },
                "genre": {
                  "id": "KnvZfZ7vAvt",
                  "name": "Metal"
                },
                "subGenre": {
                  "id": "KZazBEonSMnZfZ7vkFd",
                  "name": "Heavy Metal"
                },
                "type": {
                  "id": "KZAyXgnZfZ7v7nI",
                  "name": "Undefined"
                },
                "subType": {
                  "id": "KZFzBErXgnZfZ7v7lJ",
                  "name": "Undefined"
                },
                "family": false
              }
            ],
            "upcomingEvents": {
              "mfx-be": 1,
              "_total": 1,
              "_filtered": 0
            },
            "_links": {
              "self": {
                "href": "/discovery/v2/attractions/K8vZ917Krd7?locale=en-us"
              }
            }
          },
          {
            "name": "Pavlov's Dogs",
            "type": "attraction",
            "id": "K8vZ91721O7",
            "test": false,
            "url": "https://www.ticketmaster.com/pavlovs-dogs-tickets/artist/1662265",
            "locale": "en-us",
            "images": [
              {
                "ratio": "3_2",
                "url": "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_ARTIST_PAGE_3_2.jpg",
                "width": 305,
                "height": 203,
                "fallback": true
              },
              {
                "ratio": "3_2",
                "url": "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_TABLET_LANDSCAPE_3_2.jpg",
                "width": 1024,
                "height": 683,
                "fallback": true
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_LANDSCAPE_16_9.jpg",
                "width": 1136,
                "height": 639,
                "fallback": true
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/img/tat/cft1/201405/13/399940.jpg",
                "width": 205,
                "height": 115,
                "fallback": false
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                "width": 2048,
                "height": 1152,
                "fallback": true
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_TABLET_LANDSCAPE_16_9.jpg",
                "width": 1024,
                "height": 576,
                "fallback": true
              },
              {
                "ratio": "3_2",
                "url": "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_PORTRAIT_3_2.jpg",
                "width": 640,
                "height": 427,
                "fallback": true
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_PORTRAIT_16_9.jpg",
                "width": 640,
                "height": 360,
                "fallback": true
              },
              {
                "ratio": "16_9",
                "url": "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RECOMENDATION_16_9.jpg",
                "width": 100,
                "height": 56,
                "fallback": true
              },
              {
                "ratio": "4_3",
                "url": "https://s1.ticketm.net/img/tat/cft1/201405/13/399930.jpg",
                "width": 305,
                "height": 225,
                "fallback": false
              }
            ],
            "classifications": [
              {
                "primary": true,
                "segment": {
                  "id": "KZFzniwnSyZfZ7v7nJ",
                  "name": "Music"
                },
                "genre": {
                  "id": "KnvZfZ7vAeA",
                  "name": "Rock"
                },
                "subGenre": {
                  "id": "KZazBEonSMnZfZ7v6F1",
                  "name": "Pop"
                },
                "type": {
                  "id": "KZAyXgnZfZ7v7nI",
                  "name": "Undefined"
                },
                "subType": {
                  "id": "KZFzBErXgnZfZ7v7lJ",
                  "name": "Undefined"
                },
                "family": false
              }
            ],
            "upcomingEvents": {
              "mfx-be": 1,
              "_total": 1,
              "_filtered": 0
            },
            "_links": {
              "self": {
                "href": "/discovery/v2/attractions/K8vZ91721O7?locale=en-us"
              }
            }
          }
        ]
      }
    }
];

function List({ events = mockEvents /* <---- Remove after mock removed */ }: ListProps) {
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