const Chat = (config) => ({
    send(msg){
        config.socket.emit("chatmessage", msg)
    },
    register(socket){
        socket.on("chatmessage", config.message);
        socket.on("playerjoin", config.enter);
        socket.on("playerleave", config.leave);
    },
    unregister(socket){
        socket.off("chatmessage", config.message);
        socket.off("playerjoin", config.enter);
        socket.off("playerleave", config.leave);
    }
})