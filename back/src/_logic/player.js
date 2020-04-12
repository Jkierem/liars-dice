const { 
    range, always, pick
} = require("ramda");

const rollDice = () => Math.floor(Math.random() * 6) + 1;

const Player = (name,initialDice) => {
    let dice = initialDice;
    return {
        name,
        get dice(){ return dice },
        currentDice: range(0,dice).map(always(-1)),
        roll(diceGenerator=rollDice){
            this.currentDice = range(0,dice).map(() => diceGenerator());
            return this;
        },
        looseDice(){ 
            dice = dice - 1 
            return this;
        },
        toPOJO(){
            return pick(["name","dice"],this)
        }
    }
}

module.exports = Player;