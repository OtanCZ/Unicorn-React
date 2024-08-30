import {createContext, ReactNode, useContext, useState} from "react";

interface UserContextType {
    isAdmin: boolean;
    toggleAdmin: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({children}: UserProviderProps) {
    const [isAdmin, setAdmin] = useState(false)
    const toggleAdmin = () => {
        setAdmin(!isAdmin);
    }
    const value = {
        isAdmin,
        toggleAdmin
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}

export default UserContext;