const Player = require("./player");
const Maybe = require("../core/structures/maybe")
const { 
    complement, propEq, filter, equals, map,
    T: True, mergeRight, mergeDeepRight, evolve, pick
} = require("ramda");

const propNeq = complement(propEq)

const RuleSets = {
    Default: {
        noAces: false,         // aces count are not wildcards
        wildDice: false,       // can change the outcome of one dice per round
        salpicon: false,       // One salpicon bet per game
        courtroom: false,      // Anyone can call liar
        secondWind: false,     // When about to loose, attempt to guess a die toss to live
        oneDiceBlind: false,   // Only those with one dice can see
        changeDirection: false // Looser chooses direction
    }
}

RuleSets.BlindDice = mergeRight(RuleSets.Default, {
    oneDiceBlind: true,
})

RuleSets.CourtroomJustice = mergeRight(RuleSets.Default, {
    courtroom: true,
    changeDirection: true,
})

RuleSets.TrueLiar = mergeRight(RuleSets.Default,{
    wildDice: true,
    salpicon: true,
    secondWind: true,
})

const defaultConfig = {
    initialDice: 5,
    chat: false,
    capacity: 6,
    ruleset: RuleSets.Default,
}

const Room = (id,pass,roomConfig={}) => {
    let players = [];
    const config = mergeDeepRight(defaultConfig,roomConfig)
    return {
        id,
        password: Maybe.fromMaybeish(pass),
        get players(){ 
            return players 
        },
        get capacity(){
            return config.capacity;
        },
        get playerCount(){
            return players.length;
        },
        get ruleset(){
            return config.ruleset;
        },
        addPlayer(name){ 
            players = [...players, Player(name, config.initialDice)]
        },
        removePlayer(name){ 
            players = filter(propNeq("name",name),players) 
        },
        attemptJoin(code){
            return this.password
                .map(equals(code))
                .onNone(True)
        },
        join(name,code){
            if( this.attemptJoin(code) ){
                this.addPlayer(name);
                return true;
            } else {
                return false
            }
        },
        toPOJO(){
            return evolve(
                { 
                    password: p => Maybe.toPrimitive("",p),
                    players: map(p => p.toPOJO())
                },
                pick(["id","password","players","capacity","ruleset"],this)
            )
        }
    }
}

Room.RuleSets = RuleSets;

module.exports = Room;