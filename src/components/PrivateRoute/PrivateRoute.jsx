import { Navigate } from "react-router";

function PrivateRoute({children}){
  const auth = window.localStorage.getItem('username');

  console.log(auth)

  return auth? children : <Navigate to='/Login'/>
}

export default PrivateRoute