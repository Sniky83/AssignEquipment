import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export default function RenderLogout() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        if(cookies.token)
            removeCookie('token');
    }, [cookies, removeCookie]);

    return <Navigate to="/Login"/>;
}