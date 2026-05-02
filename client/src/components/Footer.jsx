const Footer = () => {
  const FooterList = [
    { list: "Privacy Policy" },
    { list: "Terms of Service" },
    { list: "FAQ" },
    { list: "Contact Us" },
    { list: "About Us" },
  ];

  return (
    <div className="flex justify-between px-15 py-10 items-center">
      <div>
        <a className="text-2xl font-medium cursor-pointer">RentEase</a>
        <p className="text-gray-500">
          © 2026 RentEase Furniture & Appliances. All rights reserved.
        </p>
      </div>
      <div>
        <ul className="flex gap-5 cursor-pointer">
          {FooterList.map((item, index) => (
            <li key={index} className="hover:text-gray-400 transition-all">
              <a>{item.list}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
