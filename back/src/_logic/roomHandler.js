const Maybe = require("../core/structures/maybe")
const Room = require("./room")
const { 
    complement, propEq, filter, find, pick
} = require("ramda");

const propNeq = complement(propEq)

const RoomHandler = () => {
    let rooms = []
    return {
        getRooms(){ return rooms.map(pick(["id","capacity","playerCount"])) },
        addRoom(id,pass,config){
            const r = Room(id,pass,config)
            rooms.push(r);
            return r;
        },
        getRoom(id){
            return Maybe.fromNullish(find(propEq("id",id),rooms))
        },
        removeRoom(id){
            rooms = filter(propNeq("id",id),rooms);
        },
        joinPlayer(name,roomId,pass){
            return this.getRoom(roomId)
                        .map(r => r.join(name,pass))
                        .onNone(() => false)
                        
        }
    }
}

RoomHandler.Empty = Room("","",{})

module.exports = RoomHandler