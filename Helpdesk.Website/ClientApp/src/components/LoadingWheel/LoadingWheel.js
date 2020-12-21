import {CircularProgress, makeStyles} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));

export default function LoadingWheel(props) {
    let classes = useStyles();
    return (
        <div className={classes.container}>
            <CircularProgress color="secondary"/>
        </div>
    )
}