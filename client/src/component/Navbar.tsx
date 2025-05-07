import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bottom-5 left-5 right-5 flex flex-row justify-center 
                    overflow-hidden bg-white border divide-x rounded-lg shadow-lg/50"
                    style={{ zIndex: 1000 }}>
      <button className="flex-1 text-center text-xl font-medium p-4">
        <Link to="/map">Map</Link>
      </button>

      <button className="flex-1 text-center text-xl font-medium p-4">
        <Link to="/list">List</Link>
      </button>

      <button className="flex-1 text-center text-xl font-medium p-4">
        <Link to="/favorites">Favs</Link>
      </button>
    </nav>
  );
};

export default Navbar;
