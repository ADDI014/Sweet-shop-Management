import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {user} = useContext(AuthContext);

    if(!user || user.role !== "admin"){
        return <Navigate to="/" replace/>
    }

    return children;
}

export default AdminRoute;