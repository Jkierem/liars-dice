const Chat = require("./chat")

const CHAT = "chat"

const getRoomEngine = (type) => {
    switch(type){
        case CHAT:
            return Chat;
    }
}

module.exports = {
    getRoomEngine
}