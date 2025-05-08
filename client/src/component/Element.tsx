interface ElementProps {
  event: Event;
}

function Element({ event }: ElementProps) {
  return (
    <div className="rounded-lg flex bg-gray-100 p-4 flex-col">
      <div className="flex flex-row">
        <img src={event.images[0].url} className="w-[75px] h-[75px]"/>
        <div>
          <h1 className="text-xl font-semibold align-middle m-2">{event.name}</h1>
          <h2 className="text-xl font-light align-middle m-2">{event.distance}km away</h2>
          <h2 className="text-xl font-light align-middle m-2 text-blue-600 cursor-pointer hover:underline" onClick={() => window.open(event.url)}>Click for more information</h2>
        </div>
      </div>
    </div>
  );
}

export default Element;