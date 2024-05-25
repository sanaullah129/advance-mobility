const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-700 hover:text-gray-900">Drivers</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Vehicles</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Transfers</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;