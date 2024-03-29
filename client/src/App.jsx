import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies  from 'universal-cookie';

import './App.css';
import { ChannelListContainer , ChannelContainer, Auth } from './components/index';

const cookies = new Cookies();
const apiKey = process.env.REACT_APP_API_KEY;
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if(authToken){
    client.connectUser({
        id          : cookies.get('userID'),
        name        : cookies.get('username'),
        fullName    : cookies.get('fullName'),
        image       : cookies.get('avatarURL'),
        hashedPass  : cookies.get('hashedPass'),
        phoneNumber : cookies.get('phoneNumber')
    }, authToken )
}

const App = () => {

    if(!authToken){
        return <Auth />
    }

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team ligth">
                <ChannelListContainer />
                <ChannelContainer />
            </Chat>
        </div>
    )
}

export default App
