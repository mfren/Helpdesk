import React from "react";
import {colors as COLORS, Divider, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    text: {
        display: "inline-block"
    },
    commentContainer: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
    verticalDivider: {
        height: "24px",
        width: "2px",
        marginLeft: "32px",
    },
    headerContainer: {
        backgroundColor: COLORS.grey["100"],
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        border: "1px solid #ccc!important",
        padding: theme.spacing(1)
    },
    descContainer: {
        padding: theme.spacing(1),
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
    }
}));

export default function Comment(props) {
    const classes = useStyles();
    let username = props.comment.user.email;
    let time = `${props.comment.datetime.hour}:${props.comment.datetime.minute}`;
    let date = `on ${props.comment.datetime.day}/${props.comment.datetime.month}/${props.comment.datetime.year}`
    let description = props.comment.comment;

    return (
        <div className={classes.commentContainer}>
            <Paper>
                <div className={classes.headerContainer}>
                    <Typography>{username} commented at {time} {date}</Typography>
                </div>
                <div className={classes.descContainer}>
                    <Typography>{description}</Typography>
                </div>
            </Paper>
            <Divider orientation="vertical" className={classes.verticalDivider}/>
        </div>
    )
}