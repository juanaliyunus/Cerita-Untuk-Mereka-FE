import React, { createContext, useState } from 'react';

export const AvatarContex = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState("https://www.freeiconspng.com/uploads/profile-icon-9.png");

    return (
        <AvatarContex.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContex.Provider>
    );
};
