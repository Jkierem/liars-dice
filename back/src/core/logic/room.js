const Maybe = require("../structures/maybe")
const { getRoomEngine } = require("./engines");
const { propEq } = require("ramda")

const Room = (id,ownerId,capacity,type) => ({
    id,
    ownerId,
    capacity,
    type,
    players: [],
    engine: getRoomEngine(type)(this),
    full(){ return this.capacity === this.players.length },
    join(p){ 
        this.players.forEach(p => p.socket.emit("playerjoin",p))
        this.players.push(p)
    },
    leave(id){
        this.players = this.players.filter(propEq("id",id))
        this.players.forEach(p => p.socket.emit("playerleave",id))
    },
    registerRoom(socket){
        this.engine.register(socket);
    }
})

const handler = (players,debug=false) => {
    let rooms = []
    rooms.get = (id) => {
        return Maybe.fromNullish(rooms.find(propEq("id",id)))
    }
    return {
        register(socket){
            socket.on("roomlist",(ack) => {
                ack(rooms)
            })
            socket.on("createroom", ({ name, capacity, type },ack) => {
                const r = Room(name,socket.id,capacity,type);
                rooms.push(r)
                r.registerRoom(socket);
                r.join(players.getPlayer(socket.id));
                ack(r);
            })
            socket.on("join",(id,ack) => {
                ack(rooms.get(id)
                    .map(r => {
                        if(r.full()){
                            return false
                        } else {
                            r.join(players.get(socket.id));
                            return true
                        }
                    })
                    .onNone(() => false)
                )
            })
        }
    }
}

module.exports = handler