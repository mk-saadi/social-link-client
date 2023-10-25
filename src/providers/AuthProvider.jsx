import { createContext, useEffect } from "react";

export const AuthContext = createContext(null);

import React from 'react';

const AuthProvider = ({ children}) => {

    useEffect(() => {
        const log = localStorage.getItem('access-token-social');
        
    }, []);


    return (
       <AuthContext.Provider value={null}>
            {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;