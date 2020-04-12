import React from 'react'
import { makeStyles, Container } from "@material-ui/core";
import { primary } from "../../styles/utils";

const useStyle = makeStyles((theme) => ({
    container: {
        backgroundColor: primary(theme),
        paddingTop: "16px",
        paddingBottom: "16px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center"
      }
}))

const Base = (props) => {
    const { container } = useStyle();
    return <Container className={container} {...props} />
}

export default Base;