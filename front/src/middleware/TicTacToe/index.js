const TicTacToe = (config) => ({
    register(socket){
        socket.on("tictactoemove", config.move)
        socket.on("tictactoereset", config.reset)
    },
    unregister(socket){
        socket.off("tictactoemove", config.move)
        socket.off("tictactoereset", config.reset)
    }
})

export default TicTacToe