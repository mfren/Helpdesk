import React from "react";
import {
    makeStyles,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    FormHelperText,
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    paperContainer: {
        height: "min-content",
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    formGrid: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    titleField: {
        maxWidth: "50%"
    },
    catController: {
        margin: 0,
        minWidth: 120,
        width: "100%",
    },
}));


export function FormSelector(props) {
    const classes = useStyles();
    
    return (
        <FormControl variant="filled" className={classes.catController}>
            <InputLabel>{props.title}</InputLabel>
            <Select
                value={props.value}
                onChange={props.onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {props.values.map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>)}
            </Select>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    )
}