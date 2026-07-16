import { useSelector } from "react-redux";

export const UserAvatar = ({ className }) => {
  const { user } = useSelector((state) => state.auth);

  const fullName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const displayName = fullName || user?.email?.split("@")[0] || "User";
  const userAvatar = user?.avatar?.trim();
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff&rounded=true&size=128`;
  const avatarSrc = userAvatar || fallbackAvatar;

  return (
    <div>
      <img src={avatarSrc} alt={displayName} className={className} />
    </div>
  );
};
