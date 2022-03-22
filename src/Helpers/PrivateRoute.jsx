// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useState } from "react";
//import {imLogged } from "../../Helpers/auth-helpers";
import { Navigate, Route } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ component: Component, user, logOutUser,...rest }) => {
  // Add your own authentication on the below line.

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {

    },[]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};


export default PrivateRoute;