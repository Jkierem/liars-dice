import { combineEpics } from "redux-observable";
import { nameEpic, validateEpic, dismissEpic } from "./redux/player/epics";
import { toSplashEpic } from './redux/routing/epics';

export const rootEpic = combineEpics(
    nameEpic,
    validateEpic,
    dismissEpic,
    toSplashEpic
)