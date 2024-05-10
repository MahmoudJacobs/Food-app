import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";


export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
    let requestHeaders = {Authorization:`Bearer ${localStorage.getItem("token")}`}
    let baseUrl = 'https://upskilling-egypt.com:3006/api/v1'
    let [loginData,setLoginData] = useState(null);
    const [loading, setLoading] = useState(true);

    let saveLoginData = () => {
    const encodedToken = localStorage.getItem('token');
    if (encodedToken) {
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
    }
    setLoading(false)
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
        saveLoginData()
        } else {
        setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{baseUrl, loading, requestHeaders, loginData, saveLoginData}}>
            {props.children}
        </AuthContext.Provider>
    )

}