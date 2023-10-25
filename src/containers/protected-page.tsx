import { FC, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const ProtectedPage: FC<Props> = ({ children }): any => {
  let location = useLocation();
  const isUser = useAuth();
  return isUser ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedPage;
