'use client';
import { useState, useEffect,createContext,useContext, use  } from 'react';
import { useSession } from 'next-auth/react';
import getUnReadMessageCount from '@/app/actions/getUnReadMessageCount';

///create a context
const GlobalContext = createContext();

///create a provider component
export const GlobalProvider = ({ children }) => {
    const [unReadCount, setUnReadCount] = useState(0);


    const { data: session } = useSession();

    useEffect(() => {
        if(session && session.user) {
            getUnReadMessageCount()
                .then((data) => {
                    setUnReadCount(data.count);
                })
                .catch((error) => {
                    console.error("Error fetching unread message count:", error);
                });  
        }
    },[getUnReadMessageCount,session]); 

    return (
        <GlobalContext.Provider value={{ unReadCount, setUnReadCount }}>
            {children}
        </GlobalContext.Provider>
    );
};

///create a custom hook to use the global context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
export default GlobalContext;