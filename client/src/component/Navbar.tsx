import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav
      className="fixed bottom-5 left-3 right-3 flex overflow-hidden bg-white divide-x rounded-lg shadow-lg/50"
      style={{ zIndex: 1000 }}>
      <Link to="/map" className="flex-auto flex flex-col items-center justify-center text-center text-xs font-medium p-2">
        <img src="navbar_icons/navigator.png" alt="Map" className="h-10 w-10" />
        <span>Map</span>
      </Link>

      <Link to="/list" className="flex-auto flex flex-col items-center justify-center text-center text-xs font-medium p-2">
        <img src="navbar_icons/list.png" alt="List" className="h-8 w-8" />
        <span>List</span>
      </Link>

      <Link to="/favorites" className="flex-auto flex flex-col items-center justify-center text-center text-xs font-medium p-2">
        <img src="navbar_icons/favourite.png" alt="Favorites" className="h-8 w-8" />
        <span>Favs</span>
      </Link>
    </nav>
  );
};

export default Navbar;
