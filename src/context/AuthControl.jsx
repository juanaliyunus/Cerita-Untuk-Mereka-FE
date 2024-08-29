import React, { createContext, useState } from "react";

export const AuthControl = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);

    return (
        <AuthControl.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthControl.Provider>
    );
};