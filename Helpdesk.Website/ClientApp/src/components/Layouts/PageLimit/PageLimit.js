import React from "react";
import { Container } from "@material-ui/core";

export function PageLimit(props) {
    return (
        <Container maxWidth="lg">
            {props.children}
        </Container>
    )
}