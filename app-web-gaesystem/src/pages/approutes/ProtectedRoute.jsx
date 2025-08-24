import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ element, allowedTypes }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/" replace />;

  if (allowedTypes && !allowedTypes.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
