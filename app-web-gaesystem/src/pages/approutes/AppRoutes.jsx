import { Route, Routes } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import Reports from "../reports/Reports";
import ProblemDetails from "../problemdetails/ProblemDetails";
import Header from "../../components/header/Header";
import LoginForm from "../login/LoginForm";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="reports/details/:id" element={<ProblemDetails />} />
        <Route path="homepage/details/:id" element={<ProblemDetails />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
