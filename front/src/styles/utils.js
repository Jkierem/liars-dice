import { dotPath, enumInvariant } from "../utils"
import { prop } from "ramda";
import { compose } from "redux";

const paletteProp = prop("palette")
const primaryProp = compose( prop("primary"), paletteProp )
const secondaryProp = compose( prop("secondary"), paletteProp)
const alternateProp = compose( prop("alternate"), paletteProp)

const colorInvariant = enumInvariant([
    "primary", "secondary", "alternate"
])

const variantInvariant = enumInvariant([
    "light","dark","main","contrastText"
])

export const fromPalette = (att,theme) => {
    return compose( dotPath(att) , paletteProp )(theme)
}

export const primary = ( theme, variant="main" ) => {
    if(variantInvariant(variant)){
        return compose( prop(variant), primaryProp )(theme);
    }
    return ""
}

export const secondary = ( theme, variant="main" ) => {
    if(variantInvariant(variant)){
        return compose( prop(variant), secondaryProp )(theme);
    }
    return ""
}

export const alternate = ( theme, variant="main" ) => {
    if(variantInvariant(variant)){
        return compose( prop(variant), alternateProp )(theme);
    }
    return ""
}

export const light = (theme,variant="primary") => {
    if(colorInvariant(variant)){
        return compose( prop("light"), prop(variant), paletteProp )(theme);
    }
    return ""
}

export const dark = (theme,variant="primary") => {
    if(colorInvariant(variant)){
        return compose( prop("dark"), prop(variant), paletteProp )(theme);
    }
    return ""
}

export const contrastText = (theme,variant="primary") => {
    if(colorInvariant(variant)){
        return compose( 
            prop("contrastText"), 
            prop(variant), 
            paletteProp 
        )(theme);
    }
    return ""
}