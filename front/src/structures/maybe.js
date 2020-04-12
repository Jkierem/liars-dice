import { equals, isNil } from "ramda"

const None = {
    map: (f) => None,
    flatMap: (f) => f(),
    get: () => undefined,
    isJust: () => false,
    isNone: () => true,
    onNone: (f) => f(),
    equals: (v) => v && v.isNone && v.isNone(),
    empty: () => None,
    effect: (f) => None,
    toString: () => "None",
}

const Just = (value) => {
    return {
        map: (f) => Just(f(value)),
        flatMap: (f) => f(value),
        get: () => value,
        isJust: () => true,
        isNone: () => false,
        onNone: (f) => value,
        equals: (v) => v && v.isJust && v.isJust() && equals(value,v.get()),
        empty: () => None,
        effect: (f) => {
            f(value)
            return Just(value)
        },
        toString: () => `Just(${value})`
    }
}

const unwrap = (data) => data.get ? data.get() : data

const Maybe = {
    None: () => None,
    Just,
    empty: () => None,
    fromFalsy: (data) => data ? Just(data) : None,
    fromNullish: data => isNil(data) ? None : Just(data),
    fromPredicate: (pred,data) => pred(data) ? Just(data) : None,
    fromMaybeish: (data) => unwrap(data) ? Just(data) : None,
    toPrimitive: (or,m) => m.isNone() ? or : m.get(),
}

export default Maybe