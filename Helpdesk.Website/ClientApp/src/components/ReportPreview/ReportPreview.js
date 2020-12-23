import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    ButtonBase,
    Grid,
    Typography,
    makeStyles,
    Paper,
    colors as COLORS, Tooltip
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import {withManager} from "../Manager";
import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
    buttonBase: {
        width: "100%",
        borderRadius: "8px",
    },
    paperContainer: {
        width: "100%",
        backgroundColor: COLORS.grey["50"],
        padding: theme.spacing(1),
        '&:hover': {
            boxShadow: theme.shadows[1]
        },
    },
    grid: {
        width: "100%",
    },
    titleText: {
        textAlign: "left",
        marginLeft: theme.spacing(1),
    },
    descText: {
        textAlign: "left",
        marginLeft: theme.spacing(1),
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 3,             // Limits text to x many lines
        WebkitBoxOrient: "vertical",
    },
    status1: {
        marginRight: "-3px",
        color: COLORS.red["700"],
    },
    status2: {
        color: COLORS.orange["600"],
    },
    status3: {
        marginLeft: "-3px",
        color: COLORS.green["600"],
    },
    titleTextContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        maxWidth: "80%",
    },
    statusGridItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "20%",
    },
    titleStatusGrid: {
        maxWidth: "100%",
        flexWrap: "nowrap"
    }
}));

const ReportPreviewBase = props => {
    
    const classes = useStyles();    // Use predefined CSS classes
    
    const [shadow, setShadow] = React.useState(0);
    
    let title = props.title;
    const description = props.desc;
    const status = props.status;
    const reportId = props.id;
    
    let statusText;
    statusText = status === 2 ? "Report Closed" : status === 1 ? "Being Supported" : "Awaiting Support";
    
    // TODO is there a better way to layout the dots?
    
    return (
        <ButtonBase className={classes.buttonBase} onClick={() => props.history.push(ROUTES.VIEW_REPORT + reportId)}>
            <Paper  className={classes.paperContainer} elevation={shadow}>
                <Grid container direction="column" className={classes.grid}>
                    <Grid container direction="row-reverse" className={classes.titleStatusGrid}>
                        <Grid item className={classes.statusGridItem}>
                            <Tooltip title={statusText}>
                                <Grid container direction="row-reverse">
                                    {status === 2 ? <FiberManualRecordIcon className={classes.status3}/> : <FiberManualRecordOutlinedIcon className={classes.status3}/>}
                                    {status >= 1 ? <FiberManualRecordIcon className={classes.status2}/> : <FiberManualRecordOutlinedIcon className={classes.status2}/>}
                                    {status >= 0 ? <FiberManualRecordIcon className={classes.status1}/> : <FiberManualRecordOutlinedIcon className={classes.status1}/>}
                                </Grid>
                            </Tooltip>
                        </Grid>
                        <Grid item className={classes.titleTextContainer}>
                            <Typography variant="h6" noWrap={true} className={classes.titleText}>{title}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" className={classes.descText}>{description}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </ButtonBase>
    )
}

export const ReportPreview = withManager(withRouter(ReportPreviewBase))