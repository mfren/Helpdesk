import React from "react";
import { withRouter, useParams } from 'react-router-dom';
import {
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import PageLimit from "../Layouts/PageLimit";
import {withAuth} from "../Manager/withAuth";
import {withManager} from "../Manager";
import * as CONDITIONS from "../../constants/authConditions";
import * as CONFIG_VALUES from "../../constants/reportValues";
import * as ROUTES from '../../constants/routes';


const useStyles = makeStyles((theme) => ({
    formContainer: {
        height: "min-content",
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    formLayout: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
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

const ViewReportBase = props => {
    const classes = useStyles();
    
    let { id } = useParams();
    const user = props.user;
    const isAdmin = props.isAdmin;
    
    let values = {
        title: null,
    }
    
    if (isAdmin === true) {
        
    } else if (isAdmin === false) {
        
    } else {
        
    }
    
    
    return (
        <PageLimit maxWidth="md">
            <Paper elevation={3} className={classes.formContainer}>
                <Typography component="h1" variant="h4" align="center">
                    Report: {id}
                </Typography>
            </Paper>
        </PageLimit>
    )
}

export const ViewReport = withAuth(CONDITIONS.withAnyUser)(withManager(ViewReportBase))