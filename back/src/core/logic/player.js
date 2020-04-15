const { assoc, assocPath, dissoc, propEq, values, any } = require("ramda");

const defaultName = id => "anon" + id.replace("/game","")

const Player = (id,socket) => ({
    id,
    socket,
    name: defaultName(id),
    room: null
})

const PlayerHandler = (debug=false) => {
    let players = {}

    return {
        register(socket){
            const { id } = socket
            this.push(id,socket);
            socket.on("disconnect", () => this.remove(id))
            socket.on("changeName", (name,ack) => ack(this.changeName(id,name)))
            socket.on("resetName", () => this.changeName(id,defaultName(id)))
        },
        nameTaken(name){
            return any(propEq("name",name),values(players))
        },
        getPlayer(id){
            return players.find(propEq("id",id));
        },
        push(id,socket){
            players = assoc(id,Player(id,socket),players);
            this.log()
        },
        changeName(id,name){
            if( !this.nameTaken(name) ){
                players = assocPath([id,"name"],name,players);
                return true;
            } else {
                return false;
            }
            this.log()
        },
        remove(id){
            players = dissoc(id,players)
            this.log()
        },
        log(){
            if(debug){
                console.log("Current Players: ",players)
            }
        }
    }
}

module.exports = PlayerHandler