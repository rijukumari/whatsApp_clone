import { useEffect } from "react";
import { createContext, useState,useRef } from "react";
import {io} from 'socket.io-client';

export const AccountContext = createContext(null);

export const AccountProvider = ({children}) => {
    const [account,setAccount] = useState();
    const [person,setPerson] = useState({});
    const [activeUsers,setActiveUsers] = useState([]);
    const [newMessageFlag,setNewMessageFlag] = useState(false)
    const socket = useRef();
    useEffect(()=>{
        // socket.current = io('ws://localhost:2132')
        socket.current = io('ws://localhost:2132')
    },[])

    const logout = () => {
  setAccount(null);
  localStorage.removeItem("account"); // if you're storing anything
};

    return (
        <AccountContext.Provider value={{
            account,
            setAccount,
            person,
            setPerson,
            socket,
            activeUsers,
            setActiveUsers,
            newMessageFlag,
            setNewMessageFlag,
            logout

        }}>
            {children}

        </AccountContext.Provider>
    )
}