import Element from "./Element";

interface ListProps {
  eventList: Event[];
}

function List({ eventList }: ListProps) {
  return (
    <div className="flex m-2 flex-col gap-2 max-w-md">
      { 
        eventList.map((event, index) => (
          <Element key={index} event={event}/>
        ))
      }
    </div>
  );
}

export default List;