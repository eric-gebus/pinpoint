interface ElementProps {
    event: FavoriteEvent;
  }

  function FavoriteEvent({ event }: ElementProps) {
    return (
      <div className="rounded-lg justify-between flex bg-gray-100 p-2 m-1">
      <div className="flex">
        <img
          src={event.image}
          className="w-[100px] h-[100px] self-center m-2 rounded"
          alt="Event"
        />
        <div>
          <h1 className="text-xl font-semibold align-middle m-2">
            {event.name}
          </h1>
          <h2 className="text-xl font-light align-middle m-2">
            {event.distance} km away
          </h2>
          <h2
            className="text-xl font-light align-middle m-2 text-blue-600 cursor-pointer hover:underline"
            onClick={() => window.open(event.url)}
          >
            Click for more information
          </h2>
        </div>
      </div>
    </div>
    );
  }
  
  export default FavoriteEvent;