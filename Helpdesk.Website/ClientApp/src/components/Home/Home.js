import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import {
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
import PageLimit from "../Layouts/PageLimit";
import ReportColumn from "./ReportColumn";
import {withAuth} from "../Manager/withAuth";
import {withManager} from "../Manager";
import {withAppCache} from "../Cache";
import * as CONDITIONS from '../../constants/authConditions';
import AddReportButton from "./AddReportButton";


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

function processData(snapshot) {
    let newData = [[],[],[]]
    for (const [key, val] of Object.entries(snapshot.val())) {
        newData[val.status].push({
            id: key,
            ...val
        })
    }
    return newData
}

function UserHomeBase(props) {
    const classes = useStyles();
    
    let [data, setData] = useState({
        values: props.cache.reports() !== null ? processData(props.cache.reports()) : [[],[],[]],
        loaded: props.cache.reports() !== null,
    })
        
    useEffect(() => {
        // This effect subscribes to a listener on the Firebase Realtime Database
        // The reference gets all of the reports with the correct UID
        // The data is then interpreted from an object into the "data" state
        // This is then partially passed to the "ReportColumns" to render

        let reference = props.manager.db.ref("reports")

        reference
            .orderByChild("user/uid")
            .equalTo(props.manager.auth.currentUser.uid)
            .on('value', function(snapshot) {
                props.cache.cacheReports(snapshot)
                
                setTimeout(function () {
                    setData({
                        values: processData(snapshot),
                        loaded: true,
                    });
                }, 5000)
                
            });

        return () => {
            reference.off()
        }
    }, [])

    return (
        <PageLimit maxWidth="lg">
            <Grid container direction="column" spacing={3} className={classes.mainGrid}>
                <Grid container direction="row" justify="space-between" alignItems="center" className={classes.headerGrid}>
                    <Grid item>
                        { /* TODO Replace with actual name */ }
                        <Typography variant="h4">Welcome</Typography>
                    </Grid>
                    <Grid item>
                        <AddReportButton/>
                    </Grid>
                </Grid>
                <Grid container direction="row" className={classes.reportsContainer}>
                    <Grid item md={6} xs={12} className={classes.paperGridItem}>
                        <ReportColumn
                            reports={[...new Set([...data.values[0], ...data.values[1]])]}
                            loaded={data.loaded}
                            noItems="You have no Pending Reports"
                        />
                    </Grid>
                    <Grid item md={6} xs={12} className={classes.paperGridItem}>
                        <ReportColumn
                            reports={data.values[2]}
                            loaded={data.loaded}
                            noItems="You have no Completed Reports"
                        />
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

export const Home = withAuth(CONDITIONS.withAnyUser)(withAppCache(withManager(withRouter(HomeBase))));
