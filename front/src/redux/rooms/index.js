import { createReducer, nullaryActionCreator, unaryActionCreator, nAryActionCreator } from "redux-utility";
import { mergeRight } from "ramda";

export const REQUEST_ROOMS = "jub/refresh-rooms";
export const SET_ROOMS = "jub/set-rooms";
export const CREATE_ROOM = "jub/create-room";

export default createReducer({
    [REQUEST_ROOMS]: (state) => {
        return mergeRight(state,{
            rooms: [],
            pending: true
        })
    },
    [SET_ROOMS]: (state,action) => {
        return mergeRight(state,{
            rooms: action.payload,
            pending: false
        })
    }
})

export const createRoom = nAryActionCreator(CREATE_ROOM, shape("name","game","capacity"))
export const requestRooms = nullaryActionCreator(REQUEST_ROOMS);
export const setRooms = unaryActionCreator(SET_ROOMS);