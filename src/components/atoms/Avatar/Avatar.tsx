import React from "react";
import { AvatarProps } from "./Avatar.type";

const Avatar: React.FC<AvatarProps> = ({ initials, className = "" }) => {
  return (
    <div className={`w-20 h-20 bg-[var(--color-primary)] text-white flex items-center justify-center rounded-full text-xl font-bold self-center ${className}`}>
      {initials}
    </div>
  );
};

export { Avatar };
