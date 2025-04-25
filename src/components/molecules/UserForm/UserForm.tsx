import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "./userFormSchema";
import { Button } from "../../atoms/Button";
import { useThemeStore } from "../../../stores/theme"; 

type Props = {
  defaultValues?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  isSubmitting?: boolean;
  buttonLabel: string;
};

export const UserForm = ({ defaultValues, onSubmit, isSubmitting, buttonLabel }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const { theme } = useThemeStore(); 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">First Name</label>
        <input {...register("firstName")} className="w-full border rounded p-2" />
        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Last Name (Optional)</label>
        <input {...register("lastName")} className="w-full border rounded p-2" />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input type="email" {...register("email")} className="w-full border rounded p-2" />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Date of Birth</label>
        <input type="date" {...register("dateOfBirth")} className="w-full border rounded p-2" />
        {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select
          {...register("status")}
          className={`w-full border rounded p-2 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}
        >
          <option value="">Select status</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </select>
        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
      </div>

      <div className="flex justify-center">
  <Button
    type="submit"
    disabled={isSubmitting}
    className={`py-2 px-4 rounded text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
  >
    {isSubmitting ? "Submitting..." : buttonLabel}
  </Button>
</div>


    </form>
  );
};
