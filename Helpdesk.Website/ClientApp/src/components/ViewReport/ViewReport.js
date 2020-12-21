import React, {useEffect} from "react";
import { withRouter, useParams } from 'react-router-dom';
import {
    makeStyles,
    Paper,
    Typography,
    Grid,
    colors as COLORS, Chip, Divider
} from "@material-ui/core";
import PageLimit from "../Layouts/PageLimit";
import {withAuth} from "../Manager/withAuth";
import {withManager} from "../Manager";
import * as CONDITIONS from "../../constants/authConditions";
import * as CONFIG_VALUES from "../../constants/reportValues";
import * as ROUTES from '../../constants/routes';
import ConfirmationDialogRaw from "./ConfirmationDialog";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import LoadingWheel from "../LoadingWheel/LoadingWheel";


const useStyles = makeStyles((theme) => ({
    formContainer: {
        height: "min-content",
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
    },
    dotContainer: {
        height: "100%",
    },
    chip: {
        height: "40px",
        borderRadius: '22px',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        '& .MuiChip-label': {
            color: 'white',
            fontWeight: 'bold',
            fontSize: "1rem",
        },
        '& .MuiChip-icon': {
            color: 'white',
        }
    },
    status2: {
        backgroundColor: COLORS.green["400"],
        '&:hover, &:focus': {
            backgroundColor: COLORS.green["400"],
        },
    },
    status1: {
        backgroundColor: COLORS.orange["400"],
        '&:hover, &:focus': {
            backgroundColor: COLORS.orange["400"],
        },
    },
    status0: {
        backgroundColor: COLORS.red["400"],
        '&:hover, &:focus': {
            backgroundColor: COLORS.red["400"],
        },
    },
    topDivider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        height: "2px",
    },
    bottomDivider: {
        marginBottom: theme.spacing(2),
        height: "2px",
    }
}));

const UserTimeCommentsStyles = makeStyles({
    text: {
        display: "inline-block"
    }
});

const CommentStyles = makeStyles((theme) => ({
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

function UserTimeComments(props) {
    const classes = UserTimeCommentsStyles();

    return (
        <Typography className={classes.text}>
            {props.username} reported this issue at {props.datetime.hour}:{props.datetime.minute}
        </Typography>
    )
}

function Comment(props) {
    const classes = CommentStyles();
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

const ViewReportBase = props => {
    const classes = useStyles();
    
    const [data, setData] = React.useState({
        value: null,
        loaded: false,
    });
    const [open, setOpen] = React.useState(false);

    let { id } = useParams();
    const uid = props.manager.auth.currentUser.uid;
    const isAdmin = props.isAdmin;
        
    useEffect(() => {
        // This effect subscribes to a listener on the Firebase Realtime Database
        // The reference gets all of the data from the correct report in the db

        let reference = props.manager.db.ref("reports")
        reference
            .orderByKey()
            .equalTo(id)
            .on('value', function(snapshot) {
                let newData;
                
                for (const [key, val] of Object.entries(snapshot.val())) {
                    newData = {
                        id: key,
                        ...val
                    };
                }
                
                setData({
                    value: newData,
                    loaded: true,
                });
            });

        return () => {
            reference.off()
        }
    }, [])
    
    
    if (!data.loaded) {
        return (
            <LoadingWheel/>
        )
    }
    
    //// Set up chip ////
    let iconProps = { className: classes.icon }

    let [chipLabel, colorClass, chipIcon] = data.value.status === 2 ?
        ["Report Closed", classes.status2, <CheckCircleOutlineIcon {...iconProps}/>]:
        data.value.status === 1 ?
            ["Being Supported", classes.status1, <HelpOutlineIcon {...iconProps}/>]:
            ["Awaiting Support", classes.status0, <ErrorOutlineIcon {...iconProps}/>];
    
    
    //// Chip Callbacks ////
    const handleChipClick = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue !== undefined) {
            let newData = data.value;
            newData.status = newValue;

            props.manager.request.updateForm(id, newData).then();

            setData(newData);
        }
    };
    
    
    console.log(props.manager.auth.currentUser)
    
    if (data.value === []) {
        return (
            <div>No results found</div>
        )
    }
    else if (data.value.user.uid !== uid && isAdmin === false) {
        return (
            <div>You dont have access to this report</div>
        )
    }
    else {
        return (
            <PageLimit maxWidth="md">
                <Grid container direction="row" justify="space-between">
                    <Typography variant="h3" component="h1">{data.value.title}</Typography>
                    {  /* Change chip based on whether user is admin TODO Change to conditional */
                        1 === 1 ? (
                            <div>
                                <Chip
                                    label={chipLabel}
                                    icon={chipIcon}
                                    onClick={handleChipClick}
                                    className={`${classes.chip} ${colorClass}`}
                                />
                                <ConfirmationDialogRaw
                                    id="status-menu"
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    value={data.value.status}
                                />
                            </div>
                        ) : (
                            <Chip
                                label={chipLabel}
                                icon={chipIcon}
                                className={`${classes.chip} ${colorClass}`}
                            />
                        )
                    }
                </Grid>
                <UserTimeComments 
                    username={data.value.user.email} 
                    datetime={data.value.datetime}
                    commentsLength={data.value.comments}
                />
                
                <Divider className={classes.topDivider}/>
                
                <Grid container direction="column">
                    {data.value.comments.map((value, index) => {
                        return (
                            <Grid item key={index}>
                                <Comment comment={value}/>
                            </Grid>
                        )
                    })}
                </Grid>
                <Divider className={classes.bottomDivider}/>




            </PageLimit>
        )
    }
}

export const ViewReport = withAuth(CONDITIONS.withAnyUser)(withManager(ViewReportBase))