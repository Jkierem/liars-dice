const Chat = (room) => ({
    register(socket){
        socket.on("chatmessage", msg => {
            room.players.forEach( p => p.socket.emit("chatmessage", msg))
        })
    }
})

module.exports = Chat;