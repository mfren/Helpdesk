import React from "react";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import ReportPreview from "../ReportPreview";
import NoReportsIcon from "../NoReportsIcon";
import LoadingWheel from "../LoadingWheel/LoadingWheel";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        height: "100%"
    },
}));

export default function ReportColumn(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            {props.loaded === false ?
                <LoadingWheel/>
                :
                props.reports.length === 0 ?
                    <NoReportsIcon text={props.noItems} /> :
                    <Grid container spacing={1} direction="column">
                        {props.reports.map((report, index) => {
                            return (
                                <Grid item key={index}>
                                    <ReportPreview
                                        title={report.title}
                                        desc={report.comments[0].comment}
                                        status={report.status}
                                        id={report.id}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
            }
        </Paper>
    )
}