import { useState, useEffect, createContext, useContext } from 'react'

type User = {
    _id: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    bankname: string;
    accountno: string;
    accountholdername: string;
    store: Store;
}

type Store = {
    _id: string;
    name: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;  // Add loading state
}

const UserContext = createContext<UserContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);  // Initialize loading state

    useEffect(() => {
        const user = localStorage.getItem('user');
        const expiry = localStorage.getItem('expiry');

        if (user && expiry) {
            const now = new Date();
            const expiryDate = new Date(expiry);

            if (now < expiryDate) {
                let data = JSON.parse(user);
                setUser(data);
                setLoggedIn(true);
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('expiry');
                setUser(null);
                setLoggedIn(false);
            }
        }
        setLoading(false);  // Set loading to false after checking auth status
    }, []);

    useEffect(() => {
        if (loggedIn) {
            const expiry = localStorage.getItem('expiry');
            if (expiry) {
                const now = new Date();
                const expiryDate = new Date(expiry);
                const timeout = expiryDate.getTime() - now.getTime();

                const timer = setTimeout(() => {
                    setUser(null);
                    setLoggedIn(false);
                    localStorage.removeItem('user');
                    localStorage.removeItem('expiry');
                }, timeout);

                return () => clearTimeout(timer);
            }
        }
    }, [loggedIn]);

    return (
        <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
