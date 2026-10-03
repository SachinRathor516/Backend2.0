import { useContext } from "react";
import { AuthContext } from "../authContext.jsx";


export function useAuth() {
    const context = useContext(AuthContext)
    return (context)
}