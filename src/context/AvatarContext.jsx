import React, { createContext, useState } from 'react';

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState("https://www.freeiconspng.com/uploads/profile-icon-9.png");

    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};
