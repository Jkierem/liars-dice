import io from 'socket.io-client'
import { prop, compose, __, concat, when } from "ramda"

const getEnvVariable = (str,raw=false) => {
    const dev = {
        NODE_ENV: "development",
        REACT_APP_BACK_URL: "http://localhost:8080/game",
    }
    const obj = process.env.NODE_ENV === "development" ? dev : process.env ;
    return compose( prop(__, obj), when(() => !raw,concat("REACT_APP_")))(str);
}

const server = getEnvVariable("BACK_URL")

const Connect = (onRelease) => {
    const socket = io(server)
    return {
        on(event,funk){
            socket.on(event,funk)
            return this;
        },
        emit(...data){
            socket.emit(...data)
            return this
        },
        disconnect(){
            socket.disconnect()
            return this
        },
        send(msg){
            socket.send(msg)
            return this
        },
        off(event,fn){
            socket.off(event,fn)
            return this
        },
        join(name,roomId,password,call){
            socket.emit("join",name,roomId,password,call)
            return this
        },
        info(id,call){
            socket.emit("info",id,call)
            return this
        },
        changeName(name){
            return new Promise((resolve,reject) => {
                this.emit("changeName",name,s => {
                    s? resolve(): 
                    reject("Name taken")
                })
            })
        },
        resetName(){
            this.emit("resetName")
            this.release();
            return this
        },
        release: onRelease,
    }
}

const Singleton = (() => {
    let connection = null;
    let users = 0;
    const onRelease = () => {
        users--;
        if( users === 0 ){
            connection.off();
            connection.disconnect();
            connection = null;
        }
    }
    const socketHandler = () => {
        users++;
        if( connection === null ){
            connection = Connect(onRelease)
        }
        return connection;
    }

    return socketHandler
})()

export default Singleton