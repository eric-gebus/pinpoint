import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex m-2 w-fit overflow-hidden bg-white border divide-x rounded-lg">
      <button className="px-4 py-2 text-sm font-medium">
        <Link to="/map">Map</Link>
      </button>

      <button className="px-4 py-2 text-sm font-medium ">
        <Link to="/list">List</Link>
      </button>

      <button className="px-4 py-2 text-sm font-medium">
        <Link to="/favorites">Favs</Link>
      </button>
    </nav>
  );
};

export default Navbar;
