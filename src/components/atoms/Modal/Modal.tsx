import React from "react";
import { Button } from "../../atoms/Button";
import { useThemeStore } from "../../../stores/theme";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isConfirmLoading: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isConfirmLoading,
}) => {
  const { theme } = useThemeStore(); 

  if (!isOpen) return null;

  const isDarkMode = theme === "dark";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[color:var(--color-primary)]/60 z-50">
      <div
        className={`p-6 rounded-lg shadow-lg w-96 transition-all duration-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>

        <div className="flex justify-end space-x-4">
          <Button
            className={`${
              isDarkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
            }`}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className={`${
              isConfirmLoading
                ? isDarkMode
                  ? "bg-gray-500 text-white"
                  : "bg-gray-400 text-white"
                : isDarkMode
                ? "bg-red-600 text-white"
                : "bg-red-500 text-white"
            }`}
            onClick={onConfirm}
            disabled={isConfirmLoading}
          >
            {isConfirmLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};
