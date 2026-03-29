import { Navigate } from "react-router-dom";

export default function Rotaprotegida({children}){
        const token = localStorage.getItem('token')

        if (!token){
            return <Navigate to ="/login"/>
        }

        return children
}