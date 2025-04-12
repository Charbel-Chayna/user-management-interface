import React, { useState, useEffect } from "react";
import { Navbar } from "../../organisms/Navbar";
import { SearchBar } from "../../molecules/SearchBar";
import UserCard from "../../organisms/UserCard/UserCard";
import { useAuthStore } from "../../../stores/auth"; 
import { useThemeStore } from "../../../stores/theme"; 
import { FaSpinner } from 'react-icons/fa';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dateOfBirth: string;
}

export const Home: React.FC = () => {
  const { theme } = useThemeStore(); 
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const fetchUsers = async (searchQuery: string = "") => {
    setLoading(true);
    setError(null);

    try {
      const url = searchQuery
        ? `/api/users?search=${searchQuery}`
        : "/api/users"; 

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200 && data.result?.data?.users) {
        setFilteredUsers(data.result.data.users);
      } else {
        setError("Failed to fetch users.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(search);
  }, [search]);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  const handleEdit = (id: string) => {
    console.log("Edit user with id:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete user with id:", id);
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
      <Navbar />
      <div className="p-4">
      <SearchBar search={search} setSearch={handleSearchChange} theme={theme} />

        {loading && (
          <div className="flex justify-center items-center mt-4 text-xl font-bold">
            <FaSpinner className="animate-spin mr-2 text-3xl" />
            Loading...
          </div>
        )}

        {!loading && filteredUsers.length === 0 && !error && (
          <p className="text-center mt-20 font-bold ">No users found.</p>
        )}

        {error && <p className="text-red-500 text-center mt-20 font-bold">{error}</p>}

        {!loading && filteredUsers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                status={user.status}
                dob={user.dateOfBirth}
                onEdit={() => handleEdit(user.id)}
                onDelete={() => handleDelete(user.id)}
                isDarkMode={theme === "dark"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
