import React, { useEffect } from 'react'
import Connect from '../../middleware/Connection'
import ChatEngine from '../../middleware/Chat'

const Chat = (props) => {
    useEffect(() => {
        const socket = Connect();
        const chatEngine = ChatEngine({
            socket,
            message: (...x) => console.log("message: ",...x),
            enter: (...x) => console.log("enter: ",...x),
            leave: (...x) => console.log("leave: ",...x),
        });
        return socket.register(chatEngine);
    },[])
    return <div>
        Chat
    </div>
}