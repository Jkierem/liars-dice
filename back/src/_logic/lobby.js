const RoomHandler = require("./roomHandler");

const GameLobby = () => {
    const rooms = RoomHandler();

    return {
        createRoom(id,pass,config){ 
            return rooms.addRoom(id,pass,config) 
        },
        getAvailableRooms(){
            return rooms.getRooms();
        },
        attemptJoin(name,roomId,pass){
            return rooms.joinPlayer(name,roomId,pass);
        },
        getRoomInfo(id){
            return rooms.getRoom(id).get();
        },
        leaveRoom(name,id){
            rooms.getRoom(id).map(r => r.removePlayer(name))
        }
    }
}

module.exports = GameLobby