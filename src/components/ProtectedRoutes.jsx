import { Navigate } from "react-router-dom";
import Login from "./Login";

const ProtectedRoute = ({ children }) => {
   const token = localStorage.getItem('x-access-token');
   return token ? children : <Navigate to="/login" />
}

export default ProtectedRoute;