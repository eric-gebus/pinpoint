import Element from "./Element";

interface ListProps {
  eventList: Event[];
  favEvents:Event[];
  toggleFavorite: (event:Event) => void
}

function List({ eventList, favEvents,toggleFavorite}: ListProps) {
  return (
    <div className="flex m-2 flex-col gap-2 max-w-md">
      { 
        eventList.map((event, index) => (
          <Element key={index} event={event} favoriteEvents={favEvents} toggleFavorite={toggleFavorite}/>
        ))
      }
    </div>
  );
}

export default List;