import { useMemo } from "react";
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements, Navigate } from "react-router-dom";
import { Home } from "../components/pages/Home"; 
import { Login } from "../components/pages/Login"; 
import { useAuthStore } from "../stores/auth"; 

const Routes = () => {
  const { accessToken } = useAuthStore();

  const router = useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/dashboard" element={<Navigate to="/home" />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/home"
            element={accessToken ? <Home /> : <Navigate to="/login" replace />}
          />
        </>
      )
    );
  }, [accessToken]);

  if (accessToken === undefined) {
    return <div>Loading...</div>; 
  }
  return <RouterProvider router={router} />;
};

export { Routes };
