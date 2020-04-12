import { equals, split, __, curryN, type, when, includes } from "ramda";
import { compose } from "redux";

export const isFunction = compose( equals("Function"), type );

export const extractWith = curryN(2, (data,fn) => {
    return when(isFunction,v => v(...data))(fn)
})

export const debounce = (fn,time) => {
    let id = null;
    return (...args) => {
        if( id !== null ){
            clearTimeout(id);
        }
        id = setTimeout(() => fn(...args),time);
    }
}

export const dotPath = curryN(2,(path,obj) => compose( path(__,obj), split("."))(path))

export const invariant = (msg,pred) => (...args) => {
    if( pred(...args) ){
        return true
    } else {
        console.error("Invariant violation: ",extractWith(args,msg))
        return false
    }
}

export const enumInvariant = values => {
    return invariant(
        v => `Admitted values ${values}. Received ${v}`,
        includes(__,values)
    )
}