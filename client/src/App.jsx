import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { Cookies } from 'universal-cookie';

import './App.css';
import { ChannelListContainer , ChannelContainer } from './components/index';

const apiKey = process.env.REACT_APP_API_KEY;

const client = StreamChat.getInstance(apiKey);

const App = () => {
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
