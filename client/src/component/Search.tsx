// import { useState } from "react";
// import apiService from "../apiService";


// interface SearchProps {
//   setPosition: (position: [number, number]) => void
// }

// function Search({setPosition}: SearchProps) {

//   const [search, setSearch] = useState<string>('');

//   let searchCoord: [number, number]= [0, 0];

//   async function handleSearch() {
//     const results = await apiService.searchAddress(search)
//     const searchLat = parseFloat(results[0].lat);
//     const searchLong = parseFloat(results[0].lon);
//     searchCoord = [searchLat, searchLong]
//     setPosition(searchCoord)

//     map.setView(position, mapZoom, {
//       duration: 1,
//       easeLinearity: 0.25,
//     });

//     }


//   return (
//     <>
//       {/* search-nav-container */}
//       <div className="flex place-content-between p-2 ">
//         {/* search-input */}
//         <label className="flex items-center bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]">
//           <svg
//             className="h-[1em] mr-2 opacity-50"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//           >
//             <g
//               strokeLinejoin="round"
//               strokeLinecap="round"
//               strokeWidth="2.5"
//               fill="none"
//               stroke="currentColor"
//             >
//               <circle cx="11" cy="11" r="8"></circle>
//               <path d="m21 21-4.3-4.3"></path>
//             </g>
//           </svg>
//           <input type="search" required placeholder="Search" onChange={e => setSearch(e.target.value)} />
//         </label>
//           <button onClick={handleSearch}>Click me</button>
//       </div>

//     </>
//   );
// }

// export default Search;
