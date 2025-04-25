import { Outlet } from "react-router-dom";
import { Navbar } from "../organisms/Navbar";
import { useThemeStore } from "../../stores/theme";

export const ProtectedLayout = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
