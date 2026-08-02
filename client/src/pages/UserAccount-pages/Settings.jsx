import { useState } from "react";
import UserSettings from "../../components/settings/UserSettings";
import Sidebar from "../../components/settings/Sidebar";
import UserAddressSettings from "../../components/settings/UserAddressSettings";

const Settings = () => {
  const [active, setActive] = useState("Profile");
  return (
    <div className="flex w-full flex-col gap-4 p-1 sm:p-2">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex w-full min-w-0 flex-col">
        {active === "Profile" && <UserSettings />}
        {active === "Address" && <UserAddressSettings />}
      </div>
    </div>
  );
};

export default Settings;
