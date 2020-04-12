import { combineReducers } from "redux";
import playerReducer from './redux/player'
import roomsReducer from './redux/rooms'

export const rootReducer = combineReducers({
    player: playerReducer,
    rooms: roomsReducer
})