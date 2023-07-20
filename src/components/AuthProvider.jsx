import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";


export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [adminStatus, setAdminStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user){
                fetchAdminStatus(user.uid)
            } else {
                setLoading(false)
            }
        });
    }, []);

    const fetchAdminStatus = async (uid) => {
        try {
            const response = await fetch(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/adminStatus?uid=${uid}`);
            const data = await response.json();
            setAdminStatus(data);
        } catch(error){
            console.error("Error fetcing admin status: ", error)
        }
        setLoading(false);
    }

    const value = { currentUser, adminStatus };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

// const fetchData =  async () => {
//     const response = await fetch(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/adminStatus?uid=${currentUser.uid}`);
//     const data = await response.json();

//     setAdminStatus(data)
//     console.log(adminStatus)
// }

// useEffect(() => {
//     fetchData();
// },[])