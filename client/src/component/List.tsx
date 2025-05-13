import Element from "./Element";
import { Category } from "../App";

interface ListProps {
  eventList: Event[];
  restaurantList: Restaurant[];
  favEvents: Event[];
  toggleFavorite: (event: Event) => void;
  selectedCategory: Category;
}

function List({
  eventList,
  restaurantList,
  favEvents,
  toggleFavorite,
  selectedCategory,
}: ListProps) {

  const items = selectedCategory === Category.Events ? eventList : restaurantList;

  return (
    <div className="flex m-2 flex-col gap-2 max-w-md">
      {items.map((item, index) => (
        <Element
          key={index}
          item={item}
          favoriteEvents={favEvents}
          toggleFavorite={toggleFavorite}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
}

export default List;