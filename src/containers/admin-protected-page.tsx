import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useIsAdmin } from "../hooks/useIsAdmin";

interface Props {
  children: ReactNode;
}

const AdminProtectedPage: FC<Props> = ({ children }): any => {
  let location = useLocation();
  const isAdmin = useIsAdmin();
  return isAdmin ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AdminProtectedPage;
