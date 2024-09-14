import { Navigate } from 'react-router-dom';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import  React from 'react';


export default function PrivateRoute({ component }) {
    const AuthGuard = withAuthenticationRequired(component);

    return <AuthGuard/>

}
