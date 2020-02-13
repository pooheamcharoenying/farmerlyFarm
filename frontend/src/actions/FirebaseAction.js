import React, { useEffect, useState } from "react";
export const FirebaseContext = React.createContext();

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider>
            { children }
            </FirebaseContext.Provider>

    )
}