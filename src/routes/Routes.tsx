import { useMemo } from "react";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "../components/pages/Dashboard";
import { Login } from "../components/pages/Login";
import { useAuthStore } from "../stores/auth";
import { routeNames } from "../constants/routeNames";
import { AddUserFormWrapper } from "../components/organisms/UserFormWrappers";
import { EditUserFormWrapper } from "../components/organisms/UserFormWrappers";
import { ProtectedLayout } from "../components/layouts/ProtectedLayout";

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { accessToken } = useAuthStore();
  if (!accessToken) {
    return <Navigate to={routeNames.login} replace />;
  }
  return element;
};

const Routes = () => {
  const { accessToken } = useAuthStore();

  const router = useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Navigate to={routeNames.dashboard} replace />} />
          <Route path={routeNames.login} element={<Login />} />

          <Route element={<ProtectedRoute element={<ProtectedLayout />} />}>
            <Route path={routeNames.dashboard} element={<Dashboard />} />
            <Route path="/dashboard/new" element={<AddUserFormWrapper />} />
            <Route path="/dashboard/edit/:id" element={<EditUserFormWrapper />} />
          </Route>
        </>
      )
    );
  }, [accessToken]);

  return <RouterProvider router={router} />;
};

export { Routes };
