import { createReducer, nullaryActionCreator, unaryActionCreator } from "redux-utility";
import { mergeRight } from "ramda";

export const REQUEST_ROOMS = "jub/refresh-rooms";
export const SET_ROOMS = "jub/set-rooms";

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

export const requestRooms = nullaryActionCreator(REQUEST_ROOMS);
export const setRooms = unaryActionCreator(SET_ROOMS);