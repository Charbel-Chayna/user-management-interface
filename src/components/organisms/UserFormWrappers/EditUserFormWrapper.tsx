import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { UserForm } from "../../molecules/UserForm";
import { useAuthStore } from "../../../stores/auth";
import { toast } from "react-toastify";
import { UserFormData } from "../../molecules/UserForm/userFormSchema";
import { FaSpinner } from "react-icons/fa";
import { useThemeStore } from "../../../stores/theme";

interface ApiResponse {
  status: number;
  result: {
    data: {
      user: UserFormData;
    };
    message: string;
  };
}

export const EditUserFormWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { theme } = useThemeStore(); 

  const {
    data,
    isLoading,
    isError,
  } = useQuery<ApiResponse>({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user data");
      const json = (await res.json()) as ApiResponse;
      if (!json.result?.data?.user) {
        throw new Error("User data is missing");
      }
      return json;
    },
    enabled: !!id && !!accessToken,
  });

  const mutation = useMutation({
    mutationFn: async (updatedUser: UserFormData) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.result?.message || "Failed to update user");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("User updated successfully!");
      navigate("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err.message || "An error occurred");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-4 text-xl font-bold">
        <FaSpinner className="animate-spin mr-2 text-3xl" />
        Loading...
      </div>
    );
  }

  if (isError || !data) return <div>Error fetching user data</div>;

  const user = data.result.data.user;

  return (
    <div
    className={`min-h-screen flex justify-center items-start sm:items-center px-4 py-8 ${
      theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >

      <div
        className={`max-w-lg w-full p-6 rounded-xl shadow space-y-6 ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold text-center">Edit User</h2>
        <UserForm
          defaultValues={user}
          onSubmit={(d) => mutation.mutate(d)}
          buttonLabel="Update User"
          isSubmitting={mutation.status === "pending"}
        />
      </div>
    </div>
  );
};
