const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080, () => console.log("server listenning"));

// app.get('/', function (req, res) {
//     res.json("HELLO")
// });
const SessionHandler = require("./core/logic/session");
const PlayerHandler = require("./core/logic/player");
const session = SessionHandler()
const players = PlayerHandler(true);

io
.of("/game")
.on("connection", (socket) => {
    console.log("Connection");
    session.register(socket)
    players.register(socket)
})