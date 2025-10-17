import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import ErrorPage from "../errorPage/ErrorPage";

const ProtectedRoute = ({ element, allowedTypes }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/" replace />;

  if (allowedTypes && !allowedTypes.includes(user.type)) {
    return <ErrorPage errorMessage="Acesso negado. Você não tem permissão para acessar esta página. Somente usuários do tipo coordenador podem acessar o menu admin" />;
  }

  return element;
};

export default ProtectedRoute;
