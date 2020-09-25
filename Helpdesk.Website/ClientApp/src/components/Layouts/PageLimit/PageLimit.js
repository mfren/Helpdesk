import React from "react";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    pageLimit: {
        marginTop: theme.spacing(3),
        height: "100%",
    },
}));

export function PageLimit(props) {
    const classes = useStyles()
    return (
        <Container className={classes.pageLimit} maxWidth={props.maxWidth}>
            {props.children}
        </Container>
    )
}