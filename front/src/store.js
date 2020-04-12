import { createStore, applyMiddleware } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { getDevtoolsCompose } from 'redux-utility'
import { rootReducer } from './reducer'
import { rootEpic } from './epic'

const initialState = {
    player:{},
    rooms:[]
}

export const initStore = () => {
    const composeEnhancers = getDevtoolsCompose(
        process.env.NODE_ENV === "development"
    )

    const epicMiddleware = createEpicMiddleware()

    const enhancers = [
        epicMiddleware
    ]

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...enhancers)
        )
    )

    epicMiddleware.run(rootEpic)

    return store
}