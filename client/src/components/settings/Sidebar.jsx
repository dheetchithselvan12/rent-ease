const Sidebar = ({ active, setActive }) => {
  const links = ["Profile", "Email Notifications"];
  return (
    <div className="flex  gap-4 border-b border-gray-400 pb-4">
      {links.map((link) => (
        <button
          key={link}
          className={`text-left p-2 rounded-md ${
            active === link ? "bg-blue-500 text-white" : "hover:bg-gray-200"
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
