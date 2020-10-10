import React, {useEffect} from "react";
import { withRouter, useParams } from 'react-router-dom';
import {
    makeStyles,
    Paper,
    Typography,
    Grid,
    colors as COLORS, Chip
} from "@material-ui/core";
import PageLimit from "../Layouts/PageLimit";
import {withAuth} from "../Manager/withAuth";
import {withManager} from "../Manager";
import * as CONDITIONS from "../../constants/authConditions";
import * as CONFIG_VALUES from "../../constants/reportValues";
import * as ROUTES from '../../constants/routes';
import ConfirmationDialogRaw from "./StatusChip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";


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
    }
}));

const ViewReportBase = props => {
    const classes = useStyles();
    
    const [formData, setData] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    let { id } = useParams();
    const uid = props.manager.auth.currentUser.uid;
    const isAdmin = props.isAdmin;
        
    useEffect(() => {
        console.log("View Report getting new data")
        props.manager.request.getForm(id).then(data => {
            if (data === null) {
                setData([]);
            }
            else {
                setData(data);
            }
        })
    }, [])

    if (formData === null) {
        return (
            <div>Loading</div>
        )
    }
    
    
    let timeSinceOpen = "1 hour";
    
    
    
    //// Set up chip ////
    let iconProps = { className: classes.icon }

    let [chipLabel, colorClass, chipIcon] = formData.stage === 2 ?
        ["Report Closed", classes.status2, <CheckCircleOutlineIcon {...iconProps}/>]:
        formData.stage === 1 ?
            ["Being Supported", classes.status1, <HelpOutlineIcon {...iconProps}/>]:
            ["Awaiting Support", classes.status0, <ErrorOutlineIcon {...iconProps}/>];
    
    
    //// Chip Callbacks ////
    const handleChipClick = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue !== undefined) {
            let newData = formData;
            newData.stage = newValue;

            props.manager.request.updateForm(id, newData).then();

            setData(newData);
        }
    };
    
    
    console.log(props.manager.auth.currentUser)
    
    if (formData === []) {
        return (
            <div>No results found</div>
        )
    }
    else if (formData.user !== uid && isAdmin === false) {
        return (
            <div>You dont have access to this report</div>
        )
    }
    else {
        return (
            <PageLimit maxWidth="md">
                <Grid container direction="row" justify="space-between">
                    <Typography variant="h3" component="h1">{formData.title}</Typography>
                    { /* Change chip based on whether user is admin TODO Change to conditional*/
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
                                    value={formData.stage}
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
                <div>
                    <Typography>USER opened this report {timeSinceOpen}</Typography>
                </div>
                
                
                
                
                

                <Typography variant="body1">{formData.desc}</Typography>
            </PageLimit>
        )
    }
}

export const ViewReport = withAuth(CONDITIONS.withAnyUser)(withManager(ViewReportBase))