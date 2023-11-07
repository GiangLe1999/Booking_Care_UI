import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useIsDoctor } from "../hooks/useIsDoctor";

interface Props {
  children: ReactNode;
}

const DoctorProtectedPage: FC<Props> = ({ children }): any => {
  let location = useLocation();
  const isDoctor = useIsDoctor();
  return isDoctor ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default DoctorProtectedPage;
