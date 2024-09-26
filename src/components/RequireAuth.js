import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  console.log(`Allowed Roles are ${allowedRoles}`)
  const { auth } = useAuth();
  console.log(`auth is ${JSON.stringify(auth)}`)
  const location = useLocation();
  console.log(`location is ${JSON.stringify(location)}`)
  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.user
        ? <Navigate to="/unauthorize" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth
