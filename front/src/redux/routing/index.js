import { createReducer, unaryActionCreator, shape } from "redux-utility"
import { compose, nthArg, prop, always } from "ramda";

export const CHANGE_VIEW = "jub/change-view"

export default createReducer({
    [CHANGE_VIEW]: compose( 
        shape("view"),
        prop("payload"),
        nthArg(1) 
    )
})

export const changeView = unaryActionCreator(CHANGE_VIEW);
export const toSplash = always(changeView("splash"))
export const toLobby = always(changeView("lobby"))
export const toCreateRoom = always(changeView("create"))