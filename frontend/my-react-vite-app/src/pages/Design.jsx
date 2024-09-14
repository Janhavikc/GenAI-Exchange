import * as React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Design = () =>{
    const {getAccessTokenSilently} = useAuth0();
    const [userToken, setUserToken] = React.useState('');

    React.useEffect(()=>{
        const getToken=async()=>{
            const token = await getAccessTokenSilently();
            setUserToken(token);
            return token;
        }
        getToken();
    }, [])
    
    
    return<>{userToken}</>;
}

export default Design;