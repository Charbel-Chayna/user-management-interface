export interface UserCardProps {
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    dob: string;
    onEdit: () => void;
    onDelete: () => void;
    isDarkMode: boolean;
  }
  