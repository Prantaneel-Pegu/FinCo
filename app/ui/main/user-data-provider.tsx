"use client";

import { UserData, userDataSkeleton } from "@/app/lib/types";
import { createContext, useCallback, useState } from "react";

export type UserDataContextType = {
    userData: UserData;
    updateUserData: (newUserData: UserData) => void;
};

export const UserDataContext = createContext<UserDataContextType>({
    userData: userDataSkeleton,
    updateUserData: () => {},
});

export default function UserDataProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [userData, setUserData] = useState(userDataSkeleton);

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
