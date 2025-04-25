import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../molecules/SearchBar";
import UserCard from "../../organisms/UserCard/UserCard";
import { useAuthStore } from "../../../stores/auth";
import { useThemeStore } from "../../../stores/theme";
import { toast } from "react-toastify";
import { Modal } from "../../atoms/Modal";
import { debounce } from "lodash";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dateOfBirth: string;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { theme } = useThemeStore();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchInput);
    return () => debouncedSetSearch.cancel(); 
  }, [searchInput]);

  const fetchUsers = async (): Promise<User[]> => {
    const url = search ? `/api/users?search=${search}` : "/api/users";
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data.result?.data?.users ?? [];
  };

  const { data: users = [], isLoading, isError } = useQuery<User[]>({
    queryKey: ["users", search],
    queryFn: fetchUsers,
    enabled: !!accessToken,
  });

  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    fullName: string;
  } | null>(null);

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete user");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully!");
      setSelectedUser(null);
    },
    onError: () => {
      toast.error("Failed to delete user.");
    },
  });

  const handleDeleteClick = (id: string, fullName: string) => {
    setSelectedUser({ id, fullName });
  };

  const handleConfirmDelete = () => {
    if (selectedUser?.id) {
      deleteUserMutation.mutate(selectedUser.id);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <SearchBar search={searchInput} setSearch={setSearchInput} theme={theme} />

      {isLoading && (
        <div className="flex justify-center items-center mt-4 text-xl font-bold">
          <FaSpinner className="animate-spin mr-2 text-3xl" />
          Loading...
        </div>
      )}

      {!isLoading && users.length === 0 && !isError && (
        <p className="text-center mt-20 font-bold">No users found.</p>
      )}

      {isError && (
        <p className="text-red-500 text-center mt-20 font-bold">
          Error fetching users.
        </p>
      )}

      {!isLoading && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              status={user.status}
              dob={user.dateOfBirth}
              onEdit={() => navigate(`/dashboard/edit/${user.id}`)}
              onDelete={() => handleDeleteClick(user.id, `${user.firstName} ${user.lastName}`)}
              isDarkMode={theme === "dark"}
            />
          ))}
        </div>
      )}

      {selectedUser && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          message={`Are you sure you want to delete ${selectedUser.fullName}?`}
          isConfirmLoading={deleteUserMutation.status === "pending"}
        />
      )}
    </>
  );
};
