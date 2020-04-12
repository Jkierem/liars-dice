import { map, debounceTime } from 'rxjs/operators'
import { ofType } from "redux-observable";
import { CHANGE_NAME, updatePlayer } from ".";
import Connect from '../../middleware/Connection'

export const nameEpic = action$ => action$.pipe(
    ofType(CHANGE_NAME),
    debounceTime(1000),
    map(({ payload }) => {
        Connect().changeName(payload).release();
        return updatePlayer({
            name: payload
        })
    })
)