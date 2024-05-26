import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <div className="flex space-x-4">
          <Link to="/drivers" className="text-gray-700 hover:text-gray-900">Drivers</Link>
          <Link to="/vehicles" className="text-gray-700 hover:text-gray-900">Vehicles</Link>
          <Link to="/transfers" className="text-gray-700 hover:text-gray-900">Transfers</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;