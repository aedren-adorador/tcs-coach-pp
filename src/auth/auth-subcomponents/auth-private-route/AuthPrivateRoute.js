    import React from "react";
    import { Navigate } from "react-router-dom";

    function AuthPrivateRoute(props) {
        const {component: Component, isAuthenticated, path} = props;
        return(
            <>
            {
                isAuthenticated ?
                <Component/> :
                <Navigate to='/'/>
            }
            </>
        )
    }

    export default AuthPrivateRoute;