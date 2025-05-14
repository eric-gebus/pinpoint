import { fireEvent, render, screen } from '@testing-library/react';
import EventPin from './EventPin';
import { MapContainer, TileLayer } from 'react-leaflet';


const mockEventList: Event[] = [
    {
        name: 'Vundabar',
        type: 'event',
        id: 'Z698xZC2Z16vQF4F_K',
        test: false,
        locale: 'en-us',
        images: [
            {
                url: 'https://s1.ticketm.net/dam/a/57a/2bc5bfe9-3817-4fc5-8617-8dc37529e57a_CUSTOM.jpg',
                fallback: false,
                height: 225,
                width: 305
            },
        ],
        distance: 14.31,
        units: 'KILOMETERS',
        dates: {
            start: {
                dateTime: new Date("2025-05-14T18:00:00Z"),
                localDate: new Date("2025-05-14"),
                localTime: "20:00:00"
            },
            timezone: 'Europe/Berlin',
            status: {
                code: 'onsale'
            },
        },
        _links: {
            self: { href: '/event/Z698xZC2Z16vQF4F_K' }
        },
        _embedded: {
            venues: [
                {
                    name: 'Frannz Club (Kulturbrauerei)',
                    city: { name: 'Berlin' },
                    country: { name: 'Germany', countryCode: 'DE' },
                    type: "venue",
                    id: "Z698xZC2Za7w_",
                    test: false,
                    locale: "de-de",
                    distance: 14.31,
                    units: 'KILOMETERS',
                    postalCode: '10435',
                    timezone: 'Europe/Berlin',
                    state: { name: "Berlin", },
                    address: { line1: 'Schönhauser Allee 36' },
                    _links: { self: { href: '/discovery/v2/venues/Z698xZC2Za7w_?locale=de-de' } },
                    location:{
                        latitude:"52.54",
                        longitude:"13.19"
                    }
                }
            ]
        },
        url: 'https://www.ticketmaster.de/event/vundabar-tickets/1688548653',
        isFavorite: false,
        bubbles: false,
        cancelBubble: false,
        cancelable: false,
        composed: false,
        currentTarget: null,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        returnValue: false,
        srcElement: null,
        target: null,
        timeStamp: 0,
        NONE: 0,
        CAPTURING_PHASE: 1,
        AT_TARGET: 2,
        BUBBLING_PHASE: 3
    }
  ];


  describe('Event pin component', () => {
    it('shows pin for current position', async () => {
  
      const { container } = render(
        <MapContainer center={[52.54, 13.19]} zoom={13} style={{ height: '400px', width: '600px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <EventPin
          position={[52.54, 13.19]}
          eventList={mockEventList}
          favoriteEvents={mockEventList}
          toggleFavorite={() => {}}
        />
      </MapContainer>
      );
  
      const marker = container.querySelector('.leaflet-marker-icon');
      expect(marker).toBeTruthy();
  
      if (marker) {
        fireEvent.click(marker);
        const currentPosition=await screen.findByText('You are here!');
        expect(currentPosition).toBeTruthy();
    //     expect(screen.getByText('Schönhauser Allee 36')).toBeInTheDocument();
      }

    });
  });



