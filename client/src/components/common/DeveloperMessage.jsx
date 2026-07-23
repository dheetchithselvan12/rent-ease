import { FaLock } from "react-icons/fa";
const DeveloperMessage = () => {
  return (
    <div className="flex flex-col items-center align-bottom my-20 ">
      <div className="blur-2xl flex bg-slate-500 ">
        <p className="w-40 h-50 bg-gray-300"></p>
        <p className="w-40 h-50 bg-gray-300"></p>
        <p className="w-40 h-50 bg-gray-300"></p>
      </div>
      <p>
        <FaLock size={25} className="text-blue-500" />
      </p>
      <p className="text-xl">This page is under development.</p>
    </div>
  );
};

export default DeveloperMessage;
