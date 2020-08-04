import React from 'react';
import {
    Fab,
    Grid,
    Typography,
    Paper,
    withStyles,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import NoReportsIcon from "../NoReportsIcon";
import ReportPreview from "../ReportPreview";
import PageLimit from "../Layouts/PageLimit";
import {withAuth} from "../Manager/withAuth";
import {withManager} from "../Manager";
import * as CONDITIONS from '../../constants/authConditions';


const styles = theme => ({
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
});


class UserHomeBase extends React.Component {
    constructor(props) {
        super(props);
        
        let reports = this.getReports();

        this.state = {
            pendingReports: reports[0],
            completedReports: reports[1],
        }
    }
    
    getReports() {
        const reports = [
            {
                title: "Report 1",
                desc: "Description 1",
                status: [true, true, false]
            },
            {
                title: "Report 3",
                desc: "Description 3",
                status: [true, true, false]
            },
        ];

        let pr = [];
        let cr = [];
        reports.forEach(report => {
            if (report.status[2] === true) {
                cr.push(report);
            } else {
                pr.push(report);
            }
        });
        
        return [pr, cr]
    }
    
    render() {
        const { classes } = this.props;
        
        return (
            <PageLimit>
                <Grid container direction="column" spacing={3} className={classes.mainGrid}>
                    <Grid container direction="row" justify="space-between" alignItems="center"
                          className={classes.headerGrid}>
                        <Grid item>
                            {/* TODO Replace with actual name */}
                            <Typography variant="h4">Welcome</Typography>
                        </Grid>
                        <Grid item>
                            <Fab variant="extended" color="secondary" aria-label="add" size="medium"
                                 className={classes.fab}>
                                <AddIcon className={classes.btnIcon}/>
                                <Typography variant="h6" className={classes.btnText}>Report Problem</Typography>
                            </Fab>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" className={classes.reportsContainer}>
                        <Grid item md={6} xs={12} className={classes.paperGridItem}>
                            <Paper className={classes.paperContainer}>
                                {this.state.pendingReports === null ?
                                    <div>Loading</div> :
                                    this.state.pendingReports.length === 0 ?
                                        <NoReportsIcon text="You have no Pending Reports"/> :
                                        <Grid container spacing={1} direction="column">
                                            {this.state.pendingReports.map((report, index) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <ReportPreview title={report.title} desc={report.desc} status={report.status}/>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                }
                            </Paper>
                        </Grid>
                        <Grid item md={6} xs={12} className={classes.paperGridItem}>
                            <Paper className={classes.paperContainer}>
                                {this.state.completedReports === null ?
                                    <div>Loading</div> :
                                    this.state.completedReports.length === 0  ?
                                        <NoReportsIcon text="You have no Completed Reports"/> :
                                        <Grid container spacing={1} direction="column">
                                            {this.state.completedReports.map((report, index) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <ReportPreview title={report.title} desc={report.desc} status={report.status}/>
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
}

const UserHome = withManager(withStyles(styles)(UserHomeBase));

function AdminHomeBase(props) {
    return (
        <PageLimit>
            <h1>Hello Admin!</h1>
        </PageLimit>
    )
}
const AdminHome = withManager(AdminHomeBase);

function HomeBase(props) {
    if (props.isAdmin === true) {
        return (
            <AdminHome/>
        )
    } else if (props.isAdmin === false) {
        return (
            <UserHome/>
        )
    } else {
        return (
            <div/>
        )
    }
}

export const Home = withAuth(CONDITIONS.withAnyUser)(withManager(HomeBase));
