import {  createContext, useEffect, useState } from "react";

export const Authcontext = createContext();

 export const Authprovider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');

       if(savedToken) setToken(savedToken)
        if(savedUser) setUser(JSON.parse(savedUser))

    }, []);

    useEffect(() => {

        if ( token) {
           
            localStorage.setItem("token", token);
        } else {
           
            localStorage.removeItem("token");
        }

         if ( user) {
           
            localStorage.setItem("user", JSON.stringify(user));
        } else {
           
            localStorage.removeItem("user");
        }
    }, [user, token])


    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };
    

    return (
        <Authcontext.Provider value={{ user, token, login, logout }}>
            {children}
        </Authcontext.Provider>
    );


}

