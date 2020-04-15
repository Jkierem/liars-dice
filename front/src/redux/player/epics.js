import { map, mergeMap, catchError, throttleTime } from 'rxjs/operators'
import { ofType } from "redux-observable";
import { CHANGE_NAME, validateName, setNameError, NAME_VALIDATION, nameSuccess, THROTTLE_DISMISS_ERROR, DISMISS_NAME_ERROR } from ".";
import Connect from '../../middleware/Connection'
import { fromActions } from 'redux-utility';
import { toLobby } from '../routing';
import Result from '../../structures/result';

export const nameEpic = action$ => action$.pipe(
    ofType(CHANGE_NAME),
    map(({payload}) => validateName(payload))
)

export const dismissEpic = action$ => action$.pipe(
    ofType(THROTTLE_DISMISS_ERROR),
    throttleTime(1000),
    map(() => ({ type: DISMISS_NAME_ERROR}))
)

export const validateEpic = action$ => action$.pipe(
    ofType(NAME_VALIDATION),
    mergeMap(async ({ payload }) => {
        if( !payload ){
            return Result.Err("Empty name")
        }
        await Connect().changeName(payload)
        return Result.Ok(payload)
    }),
    mergeMap((res) => {
        return res.map(
            fromActions(
                nameSuccess,
                toLobby
            )
        ).onError(
            fromActions(setNameError)
        )
    }),
    catchError(e => Promise.resolve(setNameError(e)) )
)