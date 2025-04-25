import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../../molecules/UserForm";
import { useAuthStore } from "../../../stores/auth";
import { toast } from "react-toastify";
import { UserFormData } from "../../molecules/UserForm";
import { useThemeStore } from "../../../stores/theme"; 

export const AddUserFormWrapper = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { theme } = useThemeStore(); 

  const mutation: UseMutationResult<any, Error, UserFormData, unknown> = useMutation({
    mutationFn: async (newUser: UserFormData) => {
      if (!accessToken) throw new Error("User not authenticated");

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.result?.message || "Failed to add user");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("User added successfully!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(data);
  };

  const isSubmitting = mutation.status === "pending";

  return (
    <div
    className={`min-h-screen flex justify-center items-start sm:items-center px-4 py-8 ${
      theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`max-w-lg w-full p-6 rounded-xl shadow space-y-6 ${
          theme === "dark"
            ? "bg-gray-700 text-white"
            : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold text-center">Add New User</h2>
        <UserForm
          onSubmit={onSubmit}
          buttonLabel="Add User"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
  
};
