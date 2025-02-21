import {useContext} from "react"
import {AppContext} from "../Context/AppContext"
import {Navigate} from "react-router-dom"


function PrivateRoute({children}) {
       const {authState} = useContext(AppContext)
       console.log(!authState.isAuth)
       if(!authState.isAuth) {
         return <Navigate to="/login"></Navigate>
       }
       return children
}

export default PrivateRoute;