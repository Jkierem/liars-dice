import { createStore, applyMiddleware } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { getDevtoolsCompose } from 'redux-utility'
import { rootReducer } from './reducer'
import { rootEpic } from './epic'

const testRooms = [0,1,2,3,4,5,6].map(
  val => ({
    name: `test`,
    playerCount: val*2,
    capacity: 12,
  })
)

const initialState = {
    player:{},
    rooms: testRooms,
    routing: {
        view: "splash"
    }
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