import { combineEpics } from "redux-observable";
import { nameEpic } from "./redux/player/epics";

export const rootEpic = combineEpics(
    nameEpic
)