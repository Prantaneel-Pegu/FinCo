"use client";

import { demoUserData } from "@/app/lib/demo-user-data";
import { UpdateUserData, UserData, UserDataContextType } from "@/app/lib/types";
import { createContext, useCallback, useState } from "react";


export const UserDataContext = createContext<UserDataContextType>({
    userData: demoUserData,
    updateUserData: () => {},
});

export default function DemoUserDataProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [userData, setUserData] = useState(demoUserData);

    const updateUserData = useCallback((newUserData: UserData) => {
        setUserData(newUserData);
    }, []);

    return (
        <UserDataContext.Provider
            value={{
                userData: userData,
                updateUserData: updateUserData,
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
}
