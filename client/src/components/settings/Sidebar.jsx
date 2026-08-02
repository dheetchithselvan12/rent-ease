const Sidebar = ({ active, setActive }) => {
  const links = ["Profile", "Address"];
  return (
    <div className="sticky top-20 z-10 flex w-full gap-2 overflow-x-auto rounded-md bg-white p-2 shadow-sm sm:w-fit sm:gap-4 sm:p-4">
      {links.map((link) => (
        <button
          key={link}
          type="button"
          className={`shrink-0 rounded-sm px-3 py-2 text-left text-sm font-medium sm:text-base ${
            active === link
              ? "border-b-2 border-blue-500 text-blue-500 "
              : "text-gray-700 hover:text-blue-500"
          }`}
          onClick={() => setActive(link)}
        >
          {link}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
