interface ElementProps {
    favEvent: FavoriteEvent;
    favoriteEvents:Event[];
    toggleFavorite: (event:Event) => void;
    updateFavoriteEventList: (event:FavoriteEvent) => void;

  }

  function FavoriteEvent({ favEvent,favoriteEvents,toggleFavorite,updateFavoriteEventList}: ElementProps) {
    return (
      <div className="rounded-lg flex bg-gray-100 p-4 flex-col">
        <div className="flex flex-row">
          <img src={favEvent.image} className="w-[75px] h-[75px]"/>
          <div>
            <h1 className="text-xl font-semibold align-middle m-2">{favEvent.name}</h1>
            <h2 className="text-xl font-light align-middle m-2">{favEvent.distance}km away</h2>
            <h2 className="text-xl font-light align-middle m-2 text-blue-600 cursor-pointer hover:underline" onClick={() => window.open(favEvent.url)}>Click for more information</h2>
          </div>
        </div>

        <img src={favoriteEvents.some(eventItem=>favEvent.id===eventItem.id)?"filled_heart.png":"heart.png"} onClick={
          ()=>{
            const matchedEvent = favoriteEvents.find(
              eventItem => eventItem.id === favEvent.id);
              if(matchedEvent){
                toggleFavorite(matchedEvent)
                updateFavoriteEventList(favEvent);
              }
          }
          } className="h-7 w-7 cursor-pointer object-center  mx-auto " alt="" />
      </div>
    );
  }
  
  export default FavoriteEvent;