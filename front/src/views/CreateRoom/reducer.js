import { createReducer, nAryActionCreator, shape } from 'redux-utility'
import { useReducer } from 'react'

const CHANGE_FORM = "CHANGE_FORM"

const reducer = createReducer({
    [CHANGE_FORM]: (state,{payload:{name, value}}) => {
        return {
            ...state,
            [name]: value
        }
    }
})

const initialState = {
    capacity: 1,
    fixed: false
}

const changeForm = nAryActionCreator(CHANGE_FORM,shape("name","value"))

export const useCreateForm = () => {
    const [state,dispatch] = useReducer(reducer,initialState);
    return [ state, (name,value) => dispatch(changeForm(name,value)) ]
}