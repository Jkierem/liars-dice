const SessionHandler = (debug=false) => {
    const connections = {
        ids: [],
        push(ud){
            this.ids.push(ud)
            this.log()
        },
        remove(id){
            this.ids = this.ids.filter(x => x !== id)
            this.log()
        },
        log(){
            if(debug){
                console.log("Active sessions: ",this.ids.length);
            }
        }
    }
    return {
        register(s){
            connections.push(s.id)
            console.log(`Say hello to ${s.id}`)
            
            s.on("message", (data) => {
                console.log(`${s.id}: ${data}`)
            })

            s.on("disconnect", () => {
                console.log(`${s.id} had to say goodbye`)
                connections.remove(s.id) 
            });
        }
    }
}

module.exports = SessionHandler;