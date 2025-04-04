import React from "react";

interface UserCardProps {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob: string;
  onEdit: () => void;
  onDelete: () => void;
  isDarkMode: boolean; 
}

const UserCard: React.FC<UserCardProps> = ({ 
  firstName, 
  lastName, 
  email, 
  status, 
  dob, 
  onEdit, 
  onDelete, 
  isDarkMode 
}) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <div className={`p-4 rounded-xl shadow-xl flex flex-col items-start space-y-2 w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
      <div className="w-20 h-20 bg-[#3251D0] text-white flex items-center justify-center rounded-full text-xl font-bold self-center">
        {initials}
      </div>

      <div className="w-full">
        <h2 className="text-lg font-bold">{firstName} {lastName}</h2>
        <div className="text-xs">
          <p>Email: {email}</p>
          <p>Status: {status}</p>
          <p>Date of Birth: {dob}</p>
        </div>
      </div>

      <div className="w-full flex justify-end gap-2 mt-auto">
        <button onClick={onEdit} className="bg-[#3251D0] text-white px-3 py-1 rounded cursor-pointer">
          Edit
        </button>
        <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;