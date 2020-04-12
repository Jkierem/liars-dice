const { equals } = require("ramda")

const _Error = (value) => {
    return {
        map: (f) => _Error(value),
        get: () => value,
        isOk: () => false,
        isError: () => true,
        onError: (f) => f(value),
        equals: (v) => v && v.get && equals(v.get(),value),
    }
}

const Ok = (value) => {
    return {
        map: (f) => Ok(f(value)),
        get: () => value,
        isOk: () => true,
        isError: () => false,
        onError: (f) => value,
        equals: (v) => v && v.get && equals(v.get(),value),
    }
}

module.exports = {
    Err: _Error,
    Ok,
    fromError: (e) => e instanceof Error ? _Error(e) : Ok(e),
    fromFalsy: (e) => e ? Ok(e) : _Error(e),
    fromMaybe: (m) => m.isJust() ? m.flatMap(Ok): m.flatMap(_Error)
}