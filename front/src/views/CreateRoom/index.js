import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { Card, makeStyles, Icon, TextField, Select, Button } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { toLobby } from '../../redux/routing'
import { useCreateForm } from './reducer'
import { curryN } from 'ramda'

const useStyles = makeStyles((theme) => ({
    card: {
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    inputs: {
        marginTop: "16px",
        width: "100%"
    }
}))

const wrapEvent = x => ({ target: {value: x}})

const games = [
    { id: "chat" , label: "Chat", capacity: 8, fixed: false },
    { id: "tictactoe", label: "Tic Tac Toe" , capacity: 2, fixed: true },
]

const getDefault = () => games[0]

const CreateRoom = () => {
    const css = useStyles();
    const [ formData, changeForm] = useCreateForm()
    const [ helperText, setHelper ] = useState(`${getDefault().capacity} max`);
    const dispatch = useDispatch()

    const handleBack = () => dispatch(toLobby())
    
    const handleChange = curryN(2,(name,e) => {
        changeForm(name,e.target.value);
    })

    const handleGameChange = (e) => {
        const game = games.find(x => x.id === e.target.value)
        handleChange("game", e);
        handleChange("fixed", wrapEvent(game.fixed))
        if( game.fixed ){
            handleChange("capacity", wrapEvent(game.capacity))
            setHelper(`Fixed capacity of ${game.capacity}`)
        }else{
            handleChange("capacity", wrapEvent(1))
            setHelper(`${game.capacity} max`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Change this!!!
        
        //dispatch(createRoom())
    }

    return <Card className={css.card}>
        <Icon>
            <ArrowBack onClick={handleBack}/>
        </Icon>
        <form onSubmit={handleSubmit}>
            <TextField
                className={css.inputs}
                variant="outlined"
                label="Room Name"
                onChange={handleChange("name")}
            />
            <Select
                native
                className={css.inputs}
                variant="outlined"
                defaultValue={getDefault().id}
                onChange={handleGameChange}
            >
                {games.map((g) => {
                    return <option key={g.id} value={g.id}>
                        {g.label}
                    </option>
                })}
            </Select>
            <TextField 
                className={css.inputs}
                type="number"
                variant="outlined"
                label="Capacity"
                value={formData.capacity}
                disabled={formData.fixed}
                onChange={handleChange("capacity")}
                helperText={helperText}
            />
            <Button
                type="submit"
                variant="contained"
                className={css.inputs}
                onClick={handleSubmit}
                color="secondary"
            >
                Create
            </Button>
        </form>
    </Card>
}

export default CreateRoom