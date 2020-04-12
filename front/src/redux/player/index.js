import { unaryActionCreator, createReducer } from "redux-utility";
import { compose, mergeDeepRight, prop } from "ramda";

export const CHANGE_NAME = "dice/change-name"
export const UPDATE_PLAYER = "dice/update-player";

export default createReducer({
    [UPDATE_PLAYER]: (state,action) => compose(
        mergeDeepRight(state),
        prop("payload")
    )(action)
})

export const changeName = unaryActionCreator(CHANGE_NAME)
export const updatePlayer = unaryActionCreator(UPDATE_PLAYER);