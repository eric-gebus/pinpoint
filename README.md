
# PinPoint

PinPoint is your real-time travel companion, helping you instantly discover local events, restaurants, and weather based on your current location. With a single tap, geolocate yourself and explore nearby activities shown on an interactive map and list view. Plan ahead with a 24-hour weather forecast, search other locations, pick dates, and save your favorites for quick access. Simple, efficient, and built to enhance spontaneous exploration.

## Tech Stack

Frontend: React, Vite, TypeScript, Tailwind CSS

Map: Leaflet for interactive map pins, maptiler

APIs: OpenMeteo (weather), Overpass (restaurants via OpenStreetMap), Ticketmaster (events)

Backend: Node.js, Express, MongoDB with Mongoose

Testing: Vitest

## Installation

- Install dependencies in the /client and /server folder.

**Project files:**

- Update the .env.example variables in /client folder with your maptiler API key that you can find here: https://www.maptiler.com/

- Update the .env.example variables in /server folder with your Ticketmaster API key that you can find here: https://developer.ticketmaster.com/


## Usage/Examples

1. Start the project locally by running npm run dev in both the /client and /server directories.
1. On the landing page, allow location access when prompted.
1. Tap the GPS button at the bottom-right corner to fetch your current location.
1. Use the category selector at the top-right of the map to browse nearby events or restaurants.
1. To save an event or place, click on its map pin and tap the heart icon to add it to your favourites.
1. To remove an item from your favourites, open the "Favourites" category and click the heart icon again.
1. Search other locations and dates using the search bar and date picker.
1. Scroll through the weather widget to view the 24-hour forecast for your selected location.






## Documentation

- [maptiler](https://www.maptiler.com/)
- [Ticketmaster](https://developer.ticketmaster.com/)
- [Leaflet API](https://leafletjs.com/reference.html)
- [React-Leaflet](https://react-leaflet.js.org/)


## Authors

- [@eric-gebus](https://www.github.com/-eric-gebus)
- [@Guillermo-AA](https://github.com/Guillermo-AA)
- [@liya-mary](https://github.com/liya-mary)
- [@tylaur](https://github.com/tylaur)


## Screenshots

