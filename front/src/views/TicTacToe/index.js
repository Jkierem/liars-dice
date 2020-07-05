import React, { useEffect } from "react"
import Connect from '../../middleware/Connection'
import Game from '../../middleware/TicTacToe'

const TicTacToe = (props) => {
    const tttEngine = Game({
        move: (x) => console.log("Move: ",x),
        reset: (x) => console.log("Reset ",x)
    })
    useEffect(() => {
        return Connect().register(tttEngine)
    })
    return <div>
        {"tic tac toe"}
    </div>
}