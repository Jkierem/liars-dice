const { 
    range, max, compose, flatten, 
    map, countBy, identity, ifElse,
    prop, lte, sum, values, pick, includes,
    pathOr, curryN, equals
} = require("ramda")
const Ring = require("../core/structures/ring")
const Maybe = require("../core/structures/maybe")
const Result = require("../core/structures/result")
const isInEnum = e => v => compose( includes(v), values)(e)
const rule = curryN(2,(name,room) => pathOr(false,["ruleset",name],room))

const countDice = compose(
    countBy(identity),
    flatten,
    map(p => p.currentDice)
)

const zeroBid = {
    number: -1,
    amount: 0,
}

const getAmount = (num,current,rules) => {
    if( num === current.number){
        return current.amount + 1;
    }else if( current.number === 1 && !rules.noAce ){
        return current.amount * 2;
    }else if( num === 1 && !rules.noAce ){
        return Math.floor(current.amount/2) + 1
    } else {
        return current.number > num ? current.amount + 1 : current.amount
    }
}

const calculateAmount = compose( max(1) , getAmount)

const evaluate = (counts,{ amount, number },room) => {
    return ifElse(
        rule("noAce"),
        () => compose( lte(amount), prop(number))(counts),
        () => compose( lte(amount), sum, values, pick([ number, 1 ]) )(counts)
    )(room)
}

const Orientation = {
    Forwards: 1,
    Backwards: -1
}
const isOrientation = isInEnum(Orientation)

const Game = (room) => {
    const queue = Ring.fromArray(room.players);
    let currentBid = zeroBid;
    let prevPlayer = Maybe.None();
    let currPlayer = Maybe.None();
    return {
        currentBid,
        get currentPlayer(){ return currPlayer },
        startRound(roller){
            queue.cycle(p => p.roll(roller))
            if( this.currentPlayer.isNone() ){
                currPlayer = Maybe.Just(queue.next());
            }
        },
        bid(number,amount){
            currentBid = {
                number,
                amount
            }
            prevPlayer = currPlayer;
            currPlayer = Maybe.Just(queue.next());
        },
        setOrientation(dir=Orientation.Forwards){
            if( rule("changeDirection",room) ){
                if( isOrientation(dir) ){
                    queue.changeStep(dir)
                    return Result.Ok({
                        code: 0,
                        message: `Success. Orientation is now ${dir}`
                    });
                }
                return Result.Err({
                    code: 1,
                    message: "Invalid Orientation. Accepted orientations: Forwards(1), Backwards(-1). Use Game.Orientation Enum"
                })
            } else {
                return Result.Err({
                    code: 2,
                    message: "Rule 'Change Direction' not turned on"
                })
            }
        },
        endRound(){
            if( this.evaluateBid() ){
                currPlayer.map(p => p.looseDice());
            } else {
                prevPlayer.map(p => p.looseDice());
                currPlayer = prevPlayer;
                prevPlayer = Maybe.None()
            }
            currentBid = zeroBid;
        },
        isDone(){
            return compose( equals(0) , sum, map(prop("dice")))(queue.toArray());
        },
        getDiceInPlay(){
            return compose( sum, map(prop("dice")))(queue.toArray());
        },
        evaluateBid(){
            const arr = queue.toArray()
            const counts = countDice(arr)
            return evaluate(counts,currentBid,room);
        },
        availableBids(){
            return range(1,7)
                    .map(n => ({ 
                        number: n, 
                        amount: calculateAmount(n,currentBid,room.ruleset)
                    }))
        }
    }
}

Game.Orientation = Orientation

module.exports = Game;