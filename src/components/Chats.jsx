import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext'
import axios from 'axios';

const Chats = () => {

    const history = useHistory();
    const { user } = useAuth();
    const {loading, setLoading} = useState(true);

    console.log("user-data", user);
    
    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const respons = await fetch(url);
        const data = await respons?.blob();

        
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if(!user){
            history?.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "a056e4d2-be6d-493e-b75c-83e54943be3d",
                "user-name": user?.email,
                "user-secret": user?.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata?.append('email', user.email);
            formdata?.append('username', user.email);
            formdata?.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) => {
                formdata?.append('avatar', avatar, avatar.name)

                axios.post('https://api.chatengine.io/users',
                formdata,
                { headers: { "private-key": "0380b590-3928-488b-8273-03cc968f3424" } }
            )
            .then(() => setLoading(false))
            .catch((error) => console.log(error))
            })
        })
    }, [user, history]);

    if(!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    <img style={{width: "50px"}} src="https://cryptologos.cc/logos/chatcoin-chat-logo.png" alt="" />
                    OnionChat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine 
            height="calc(100vh - 66px)"
            projectID="a056e4d2-be6d-493e-b75c-83e54943be3d"
            userName={user?.email}
            userSecret={user?.uid}
            />
            
        </div>
    );

}

export default Chats;