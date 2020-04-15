import { unaryActionCreator, createReducer, nullaryActionCreator } from "redux-utility";
import { compose, mergeDeepRight, prop } from "ramda";

export const CHANGE_NAME = "jub/change-name"
export const UPDATE_PLAYER = "jub/update-player";

export const NAME_VALIDATION = "jub/name-validation";
export const NAME_SUCCESS = "jub/name-success";
export const NAME_ERROR = "jub/name-error";
export const DISMISS_NAME_ERROR = "jub/dismiss-name-error";
export const THROTTLE_DISMISS_ERROR = "jub/throttle-name-error"

export default createReducer({
    [UPDATE_PLAYER]: (state,action) => compose(
        mergeDeepRight(state),
        prop("payload")
    )(action),
    [NAME_VALIDATION]: (state,{ payload }) => {
        return mergeDeepRight(state,{
            name: payload,
            nameValidation: {
                loading: true,
                invalid: false,
                message: ""
            }
        })
    },
    [NAME_SUCCESS]: (state,{ payload }) => {
        return mergeDeepRight(state,{
            name: payload,
            nameValidation: {
                loading: false,
                invalid: false,
                message: ""
            }
        })
    },
    [NAME_ERROR]: (state,action) => {
        return mergeDeepRight(state,{
            nameValidation: {
                loading: false,
                invalid: true,
                message: action.payload
            }
        })
    },
    [DISMISS_NAME_ERROR]: (state) => {
        return mergeDeepRight(state,{
            nameValidation: {
                loading: false,
                invalid: false,
                message: ""
            }
        })
    }
})

export const changeName = unaryActionCreator(CHANGE_NAME)
export const updatePlayer = unaryActionCreator(UPDATE_PLAYER);

export const validateName = unaryActionCreator(NAME_VALIDATION);
export const nameSuccess = nullaryActionCreator(NAME_SUCCESS)
export const setNameError = unaryActionCreator(NAME_ERROR);
export const dismissNameError = nullaryActionCreator(THROTTLE_DISMISS_ERROR)