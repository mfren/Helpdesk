import React from "react";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    pageLimit: {
        marginTop: theme.spacing(3),
    },
}));

export function PageLimit(props) {
    const classes = useStyles()
    return (
        <Container className={classes.pageLimit} maxWidth="lg">
            {props.children}
        </Container>
    )
}