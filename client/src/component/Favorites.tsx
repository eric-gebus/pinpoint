import { useEffect, useState } from "react";
import apiService from "../apiService";
import FavoriteEvent from "./FavoriteEvent";


function Favorites() {
 const [favoriteEventList,setFavoriteEventList]=useState<FavoriteEvent[]>([]);

  useEffect(()=>{
    (async ()=>{
      const favoriteEvents=await apiService.getFavoriteEvents();
      setFavoriteEventList(favoriteEvents);
    })()
  },[])

    return (
      <div className="flex m-2 flex-col gap-2 max-w-md">
      { 
        favoriteEventList.map((event, index) => (
          <FavoriteEvent key={index} event={event}/>
        ))
      }
    </div>
    );
  }
  
  export default Favorites;