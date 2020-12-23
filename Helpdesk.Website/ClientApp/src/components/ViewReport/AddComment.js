import React from "react";
import clsx from "clsx";
import {Button, CircularProgress, colors as COLORS, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
    text: {
        display: "inline-block"
    },
    commentContainer: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
    headerContainer: {
        backgroundColor: COLORS.grey["100"],
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        border: "1px solid #ccc!important",
        padding: theme.spacing(1)
    },
    descContainer: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonWrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}));

export default function AddComment(props) {
    const classes = useStyles();

    const [comment, setComment] = React.useState("")
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true)

        props.func(props.formId, comment)
            .then(() => {
                setLoading(false);
                setSuccess(true);
                setComment("");
            })
            .catch((error) => {
                setLoading(false);
                setSuccess(false);
            })
    }

    return (
        <div className={classes.commentContainer}>
            <Paper>
                <div className={classes.headerContainer}>
                    <Typography>Add a comment to this discussion</Typography>
                </div>
                <div className={classes.descContainer}>
                    <TextField
                        label="Comment"
                        margin="dense"
                        variant="filled"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <div className={classes.buttonContainer}>
                        <div className={classes.buttonWrapper}>
                            <Button variant="contained" color="primary" disabled={comment === ""} onClick={handleSubmit} className={buttonClassname}>
                                Submit
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    )
}