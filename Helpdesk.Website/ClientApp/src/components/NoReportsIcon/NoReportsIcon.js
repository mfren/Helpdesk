import React from 'react';
import {
    Avatar,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";


const useStyles = makeStyles((theme) => ({
    noReportsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.grey,
        width: theme.spacing(8),
        height: theme.spacing(8)
    },
    icon: {
        width: "60%",
        height: "60%"
    }
}));

export default function NoReportsIcon(props) {
    
    const classes = useStyles();    // Use predefined CSS classes
    
    return (
        <div className={classes.noReportsContainer}>
            <Grid container direction="column" alignItems="center">
                <Avatar className={classes.avatar}>
                    <ThumbUpIcon className={classes.icon}/>
                </Avatar>
                <Typography variant="body2">{props.text}</Typography>
            </Grid>
        </div>
    )
}
