import { useContext } from "react"

import { Navigate } from "react-router-dom"
import {Authcontext} from '../Context/Authcontext'

function ProtectedRoute({children}){

    const { token } = useContext(Authcontext);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;


}
export default ProtectedRoute