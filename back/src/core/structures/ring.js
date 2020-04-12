const { __, mathMod } = require("ramda")

const Ring = (data,init=0,d=1) => {
    let pointer = init;
    let delta = d;
    const mod = mathMod(__,data.length);
    return {
        get length(){ return data.length },
        next(){
            const element = data[pointer];
            pointer = mod(pointer+delta);
            return element
        },
        prev(){
            const element = data[pointer];
            pointer = mod(pointer-delta);
            return element
        },
        reverse(){
            delta = -delta;
        },
        changeStep(d){
            delta = d;
        },
        map(f){
            return Ring(data.map(f),pointer);
        },
        filter(){
            return  Ring(data.filter(f),pointer)
        },
        cycle(f){
            for(let i = 0; i < data.length; i++ )
                f(this.next());
            return this;
        },
        toArray(){
            return data;
        }
    }
}

module.exports = {
    fromArray: Ring,
}