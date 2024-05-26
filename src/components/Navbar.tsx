import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-200 shadow-md text-gray-600">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-3xl font-bold text-blue-950 hover:text-gray-900">
          <Link to="/">Advance Mobility</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/drivers" className="hover:text-white">
            Drivers
          </Link>
          <Link to="/vehicles" className="hover:text-white">
            Vehicles
          </Link>
          <Link to="/transfers" className="hover:text-white">
            Transfers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
