import { useEffect, useState } from "react";
import apiService from "../apiService";
import FavoriteEvent from "./FavoriteEvent";

interface Favorites{
  favEvents:Event[];
  toggleFavorite: (event:Event) => void
}

function Favorites({favEvents,toggleFavorite}:Favorites) {
 const [favoriteEventList,setFavoriteEventList]=useState<FavoriteEvent[]>([]);

  useEffect(()=>{
    (async ()=>{
      const favoriteEvents=await apiService.getFavoriteEvents();
      setFavoriteEventList(favoriteEvents);
    })()
  },[])

  function updateFavoriteEventList(event:FavoriteEvent){
      const updatedFavs:FavoriteEvent[]=favoriteEventList.filter((eventItem)=>{
        return eventItem.id !==event.id
    })
    setFavoriteEventList(updatedFavs);
  }

    return (
      <div className="flex m-2 flex-col gap-2 max-w-md">
      { 
        favoriteEventList.map((event, index) => (
          <FavoriteEvent key={index} favEvent={event} favoriteEvents={favEvents} toggleFavorite={toggleFavorite} updateFavoriteEventList={updateFavoriteEventList}/>
        ))
      }
    </div>
    );
  }
  
  export default Favorites;