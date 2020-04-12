import { combineReducers } from "redux";
import playerReducer from './redux/player'
import roomsReducer from './redux/rooms'
import routeReducer from './redux/routing'

export const rootReducer = combineReducers({
    player: playerReducer,
    rooms: roomsReducer,
    routing: routeReducer
})