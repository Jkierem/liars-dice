import { filter, map } from 'rxjs/operators'
import Connect from '../../middleware/Connection'
import { CHANGE_VIEW } from '.'
import { updatePlayer } from '../player'

export const toSplashEpic = action$ => action$.pipe(
    filter(x => {
        return x.type === CHANGE_VIEW && x.payload === "splash"
    }),
    map(x => {
        Connect().resetName().release()
        return updatePlayer({ name: "" })
    })
)