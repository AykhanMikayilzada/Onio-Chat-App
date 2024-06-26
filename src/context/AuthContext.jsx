import React, {useContext, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);



export const AuthProvider = ({ children }) => {
    const [loading, setloading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    console.log("loading",loading);
    console.log("history", history);

    useEffect(() =>{
        auth?.onAuthStateChanged((user) => {
            setUser(user);
            setloading(false);
           if(user) history?.push('/chats');
        })
    }, [user, history]);

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>


    );  
};