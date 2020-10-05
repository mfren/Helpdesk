import React, {useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import {
    Fab,
    Grid,
    Typography,
    Paper,
    makeStyles,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import NoReportsIcon from "../NoReportsIcon";
import ReportPreview from "../ReportPreview";
import PageLimit from "../Layouts/PageLimit";
import {withAuth} from "../Manager/withAuth";
import {withManager} from "../Manager";
import * as CONDITIONS from '../../constants/authConditions';
import * as ROUTES from '../../constants/routes';


const useStyles = makeStyles((theme) => ({
    btnIcon: {
        marginRight: theme.spacing(1),
    },
    btnText: {
        marginRight: theme.spacing(1),
        fontSize: "1rem",
        fontWeight: "700",
    },
    fab: {
        textTransform: "none",  // Prevents the FAB's text from being capitalized
    },
    mainGrid: {
        height: "100%"
    },
    subGridContainer: {
        height: "100%",
        flexGrow: "1",
    },
    paperGridItem: {
        padding: theme.spacing(1),
        height: "100%"
    },
    paperContainer: {
        padding: theme.spacing(2),
        height: "100%"
    },
    reportsContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
    },
    headerGrid: {
        padding: theme.spacing(1)
    },
}));

function UserHomeBase(props) {
    const classes = useStyles();
    
    const [pendingReports, setPR] = React.useState(null);
    const [completedReports, setCR] = React.useState(null);
    
    useEffect(() => {
        let isMounted = true;
        
        // Here we will fetch all appropriate data from the db
        props.manager.request.getForms().then(data => {
            let pr = [];    // Temp holder for reports
            let cr = [];
            
            if (data !== null) {
                // Loop through all data retrieved
                // eslint-disable-next-line no-unused-vars
                for (const [key, val] of Object.entries(data)) {
                    // stage === 2 indicates that it is completed
                    if (val.stage === 2) {
                        cr.push(val);
                    } else {
                        pr.push(val)
                    }
                }
            }
            
            
            // Pause if this
            if (pendingReports === null || completedReports === null) {
                if (isMounted) {
                    setPR(pr);
                    setCR(cr);
                }
            } else {
                setTimeout(function() {
                    if (isMounted) {
                        setPR(pr);
                        setCR(cr);
                    }
                }, 5000)
            }
        })
        return () => { isMounted = false };
    })

        
    return (
        <PageLimit maxWidth="lg">
            <Grid container direction="column" spacing={3} className={classes.mainGrid}>
                <Grid container direction="row" justify="space-between" alignItems="center"
                      className={classes.headerGrid}>
                    <Grid item>
                        {/* TODO Replace with actual name */}
                        <Typography variant="h4">Welcome</Typography>
                    </Grid>
                    <Grid item>
                        <Fab variant="extended" 
                             color="secondary" 
                             aria-label="add" 
                             size="medium"
                             onClick={() => props.history.push(ROUTES.NEW_REPORT)}
                             className={classes.fab}>
                            <AddIcon className={classes.btnIcon}/>
                            <Typography variant="h6" className={classes.btnText}>Report Problem</Typography>
                        </Fab>
                    </Grid>
                </Grid>
                <Grid container direction="row" className={classes.reportsContainer}>
                    <Grid item md={6} xs={12} className={classes.paperGridItem}>
                        <Paper className={classes.paperContainer}>
                            {pendingReports === null ?
                                <div>Loading</div> :
                                pendingReports.length === 0 ?
                                    <NoReportsIcon text="You have no Pending Reports"/> :
                                    <Grid container spacing={1} direction="column">
                                        {pendingReports.map((report, index) => {
                                            return (
                                                <Grid item key={index}>
                                                    <ReportPreview title={report.title} desc={report.desc} status={report.stage}/>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                            }
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12} className={classes.paperGridItem}>
                        <Paper className={classes.paperContainer}>
                            {completedReports === null ?
                                <div>Loading</div> :
                                completedReports.length === 0  ?
                                    <NoReportsIcon text="You have no Completed Reports"/> :
                                    <Grid container spacing={1} direction="column">
                                        {completedReports.map((report, index) => {
                                            return (
                                                <Grid item key={index}>
                                                    <ReportPreview title={report.title} desc={report.desc} status={report.stage}/>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </PageLimit>
    )
}

function AdminHomeBase(props) {
    return (
        <PageLimit maxWidth="lg">
            <h1>Hello Admin!</h1>
        </PageLimit>
    )
}
function HomeBase(props) {
    if (props.isAdmin === true) {
        return (
            <AdminHomeBase {...props}/>
        )
    } else if (props.isAdmin === false) {
        return (
            <UserHomeBase {...props}/>
        )
    } else {
        return (
            <div/>
        )
    }
}

export const Home = withAuth(CONDITIONS.withAnyUser)(withManager(withRouter(HomeBase)));
