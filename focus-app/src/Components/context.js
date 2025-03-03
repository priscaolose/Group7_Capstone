import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() =>{
        const localUser = localStorage.getItem("user");
        return localUser ? JSON.parse(localUser) : null;
    });

    const [tasks, setTasks] = useState(() =>{
        const userTasks = localStorage.getItem("tasks");
        return userTasks ? JSON.parse(userTasks) : [];
    });

    useEffect(() => {
        if(user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    useEffect(() => {
        if(tasks) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
            localStorage.removeItem("tasks");
        }
    }, [tasks]);

    return (
        <UserContext.Provider value={{ user, setUser, tasks, setTasks }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);