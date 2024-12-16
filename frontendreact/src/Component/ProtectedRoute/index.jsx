import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  if (!Cookies.get('token')) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


export default ProtectedRoute;