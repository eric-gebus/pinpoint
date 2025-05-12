interface ElementProps {
  event: Event;
  favoriteEvents:Event[];
  toggleFavorite: (event:Event) => void
}

function Element({ event,favoriteEvents,toggleFavorite }: ElementProps) {
  return (
    <div className="rounded-lg flex bg-gray-100 p-4 flex-col">
      <div className="flex flex-row justify-between">
        <img src={event.images[0].url} className="w-[75px] h-[75px]"/>
        <div>
          <h1 className="text-xl font-semibold align-middle m-2">{event.name}</h1>
          <h2 className="text-xl font-light align-middle m-2">{event.distance}km away</h2>
          <h2 className="text-xl font-light align-middle m-2 text-blue-600 cursor-pointer hover:underline" onClick={() => window.open(event.url)}>Click for more information</h2>
        </div>
      </div>
      <img src={favoriteEvents.some(favevent=>event.id===favevent.id)?"filled_heart.png":"heart.png"} onClick={()=>toggleFavorite(event)} className="h-7 w-7 cursor-pointer object-center  mx-auto " alt="" />
    </div>
  );
}

export default Element;