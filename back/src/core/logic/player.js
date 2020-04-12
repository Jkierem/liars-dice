const { assoc, assocPath, dissoc, mergeDeepRight } = require("ramda");

const Player = (id) => ({
    id,
    name: "anon" + id.replace("/game",""),
    room: null
})

const PlayerHandler = (debug=false) => {
    let players = {}

    return {
        register(socket){
            const { id } = socket
            this.push(id);
            socket.on("disconnect", () => this.remove(id))
            socket.on("changeName", (name) => this.changeName(id,name))
        },
        push(id){
            players = assoc(id,Player(id),players);
            this.log()
        },
        changeName(id,name){
            players = assocPath([id,"name"],name,players);
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