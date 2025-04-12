import React from "react";
import { UserInfoProps } from "./UserInfo.type";

const UserInfo: React.FC<UserInfoProps> = ({ firstName, lastName, email, status, dob }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold">{firstName} {lastName}</h2>
      <div className="text-xs">
        <p>Email: {email}</p>
        <p>Status: {status}</p>
        <p>Date of Birth: {dob}</p>
      </div>
    </div>
  );
};

export { UserInfo };
