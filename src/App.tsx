import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar"; 
import UserCard from "./components/UserCard"; 

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", status: "Active", dob: "1990-01-01" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", status: "Locked", dob: "1992-05-10" },
    { id: 3, firstName: "Soan", lastName: "Petchi", email: "Soan@example.com", status: "Active", dob: "1990-01-01" },
    { id: 4, firstName: "Jenna", lastName: "larry", email: "jenna@example.com", status: "Locked", dob: "1990-01-02" },
    { id: 5, firstName: "Diego", lastName: "Bwen", email: "diego@example.com", status: "Active", dob: "1990-01-03" },
    { id: 6, firstName: "Tomas", lastName: "Dello", email: "tomas@example.com", status: "Locked", dob: "1990-01-04" },
    { id: 7, firstName: "Peter", lastName: "Aleft", email: "peter@example.com", status: "Active", dob: "1990-01-05" },
    { id: 8, firstName: "Alissa", lastName: "Dienna", email: "alissa@example.com", status: "Active", dob: "1990-01-06" },
  ];

  const handleEdit = (id: number) => {
    console.log("Edit user with id:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete user with id:", id);
  };

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <Navbar theme={theme} setTheme={setTheme} />

      <div className="p-4">
        <SearchBar search={search} setSearch={setSearch} theme={theme} /> 
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users
            .filter(user => 
              (user.firstName + " " + user.lastName).toLowerCase().includes(search.toLowerCase())
            )
            .map(user => (
              <UserCard
                key={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                status={user.status}
                dob={user.dob}
                onEdit={() => handleEdit(user.id)}
                onDelete={() => handleDelete(user.id)}
                isDarkMode={theme === "dark"} 
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;