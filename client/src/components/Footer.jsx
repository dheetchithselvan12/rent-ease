const Footer = () => {
  const footerList = [
    { list: "Privacy Policy" },
    { list: "Terms of Service" },
    { list: "FAQ" },
    { list: "Contact Us" },
    { list: "About Us" },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8 xl:px-0">
      <div>
        <a className="cursor-pointer text-2xl font-medium">RentEase</a>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          © 2026 RentEase Furniture & Appliances. All rights reserved.
        </p>
      </div>

      <ul className="flex flex-wrap justify-center gap-4 text-sm sm:gap-5 sm:text-base md:justify-end">
        {footerList.map((item, index) => (
          <li key={index} className="transition-all hover:text-gray-400">
            <a>{item.list}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
