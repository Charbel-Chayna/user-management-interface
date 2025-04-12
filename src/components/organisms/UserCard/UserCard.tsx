import React from "react";
import { Avatar } from "../../atoms/Avatar";
import { Button } from "../../atoms/Button";
import { UserInfo } from "../../molecules/UserInfo";
import { UserCardProps } from "./UserCard.type";
import { useThemeStore } from "../../../stores/theme"; 

const UserCard: React.FC<UserCardProps> = ({
  firstName,
  lastName,
  email,
  status,
  dob,
  onEdit,
  onDelete
}) => {
  const { theme } = useThemeStore(); 
  const initials = `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`;

  return (
    <div
      className={`p-4 rounded-xl shadow-xl flex flex-col items-start space-y-2 w-full transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
    >
      <Avatar initials={initials} />

      <UserInfo
        firstName={firstName}
        lastName={lastName}
        email={email}
        status={status}
        dob={dob}
      />

      <div className="w-full flex justify-end gap-2 mt-auto">
        <Button
          onClick={onEdit}
          className="bg-[var(--color-primary)] text-white px-3 py-1 rounded cursor-pointer"
        >
          Edit
        </Button>
        <Button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
