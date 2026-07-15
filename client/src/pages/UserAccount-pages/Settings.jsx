import { useState } from "react";
import UserSettings from "../../components/settings/UserSettings";
import Sidebar from "../../components/settings/Sidebar";
import UserAddressSettings from "../../components/settings/UserAddressSettings";

const Settings = () => {
  const [active, setActive] = useState("Profile");
  return (
    <div className="flex flex-col gap-4">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex flex-col items-center w-3/4 ">
        {active === "Profile" && <UserSettings />}
        {active === "Address" && <UserAddressSettings />}
      </div>
    </div>
  );
};

export default Settings;
