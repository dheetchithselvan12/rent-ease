const Sidebar = ({ active, setActive }) => {
  const links = ["Profile", "Address"];
  return (
    <div className="flex  sticky top-20 bg-white  gap-4  p-4 rounded-md shadow-sm">
      {links.map((link) => (
        <button
          key={link}
          className={`text-left p-2   ${
            active === link
              ? "border-b-2 border-blue-500 text-blue-500 "
              : "hover:border-blue-500"
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
