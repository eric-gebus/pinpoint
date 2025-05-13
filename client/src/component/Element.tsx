import { Category } from "../App";

interface ElementProps {
  item: Event | Restaurant;
  favoriteEvents?: Event[];
  toggleFavorite?: (event: Event) => void;
  selectedCategory: Category;
}

function Element({ item, favoriteEvents, toggleFavorite, selectedCategory }: ElementProps) {
  if (selectedCategory === Category.Events) {
    const event = item as Event;
    const isFavorite = favoriteEvents?.some(favevent => event.id === favevent.id) || false;

    return (
      <div className="rounded-lg flex bg-gray-100 p-4 flex-col">
        <div className="flex flex-row justify-between">
          <img src={event.images[0].url} className="w-[75px] h-[75px]" alt="Event" />
          <div>
            <h1 className="text-xl font-semibold align-middle m-2">{event.name}</h1>
            <h2 className="text-xl font-light align-middle m-2">{event.distance}km away</h2>
            <h2
              className="text-xl font-light align-middle m-2 text-blue-600 cursor-pointer hover:underline"
              onClick={() => window.open(event.url)}
            >
              Click for more information
            </h2>
          </div>
        </div>
        <img
          src={isFavorite ? "filled_heart.png" : "heart.png"}
          onClick={() => toggleFavorite?.(event)}
          className="h-7 w-7 cursor-pointer object-center mx-auto"
          alt="Favorite"
        />
      </div>
    );
  } else {
    const restaurant = item as Restaurant;
    return (
      <div className="rounded-lg flex bg-gray-100 p-4 flex-col">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-xl font-semibold align-middle m-2">{restaurant.tags.name}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Element;