import { Route, Routes } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import Reports from "../reports/Reports";
import ProblemDetails from "../problemdetails/ProblemDetails";
import Header from "../../components/header/Header";
import LoginForm from "../login/LoginForm";
import PainelAdmin from "../paineladmin/PainelAdmin";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Login sempre aberto */}
        <Route path="/" element={<LoginForm />} />

        {/* Todas as rotas abaixo só podem ser acessadas por usuários logados */}
        <Route
          path="/homepage"
          element={<ProtectedRoute element={<Homepage />} />}
        />
        <Route
          path="/reports"
          element={<ProtectedRoute element={<Reports />} />}
        />
        <Route
          path="/reports/details/:id"
          element={<ProtectedRoute element={<ProblemDetails />} />}
        />
        <Route
          path="/homepage/details/:id"
          element={<ProtectedRoute element={<ProblemDetails />} />}
        />

        {/* Admin apenas para coordenador */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<PainelAdmin />}
              allowedTypes={["COORDENADOR"]}
            />
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
