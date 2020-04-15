import { equals } from "ramda"

const _Error = (value) => {
    return {
        map: (f) => _Error(value),
        get: () => value,
        isOk: () => false,
        isErr: () => true,
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

const Result = {
    Err: _Error,
    Ok,
    fromError: (e) => e instanceof Error ? _Error(e) : Ok(e),
    fromPromise: async (p) => {
        try {
            const res = await p;
            return Ok(res);
        } catch(e) {
            return _Error(e);
        }
    }
}

export default Result