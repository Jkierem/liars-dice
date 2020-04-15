const Maybe = require("../structures/maybe")
const { propEq } = require("ramda")


const Room = (id,ownerId,capacity) => ({
    id,
    ownerId,
    capacity,
    players: [],
    full(){ return this.capacity === this.players.length },
    join(p){ 
        this.players.forEach(p => p.socket.emit("playerjoin",p))
        this.players.push(p)
    },
    leave(id){
        this.players = this.players.filter(propEq("id",id))
        this.players.forEach(p => p.socket.emit("playerleave",id))
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