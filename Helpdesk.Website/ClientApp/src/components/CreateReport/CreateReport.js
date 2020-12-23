import React from "react";
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import {
    Button,
    makeStyles,
    Paper, 
    TextField, 
    Tooltip, 
    Grid,
    Typography,
    CircularProgress
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import PageLimit from "../Layouts/PageLimit";
import FormSelector from "../FormSelector";
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

const CreateReportBase = props => {
    const classes = useStyles();
    
    // State variables
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [cat, setCat] = React.useState("");
    const [urg, setUrg] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });
    
    // Form validation
    let valid = true;
    let tooltip = "";
    
    if (title === "") {
        valid = false;
        tooltip = "Please add: Title"
    }
    if (desc === ""){
        valid = false;
        
        if (tooltip === ""){
            tooltip = "Please add: Description"
        }
        else {
            tooltip = tooltip + ", Description"
        }
    }
    if (cat === ""){
        valid = false;

        if (tooltip === ""){
            tooltip = "Please add: Category"
        }
        else {
            tooltip = tooltip + ", Category"
        }
    }
    if (urg === ""){
        valid = false;

        if (tooltip === ""){
            tooltip = "Please add: Urgency"
        }
        else {
            tooltip = tooltip + ", Urgency"
        }
    }
    
    const handleChange = {
        title: event => {
            setTitle(event.target.value);
        },
        desc: event => {
            setDesc(event.target.value);
        },
        cat: event => {
            setCat(event.target.value);
        },
        urg: event => {
            setUrg(event.target.value);
        }
    };
    
    const submit = async function(event) {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }
        
        props.manager.request.postForm(title, desc, urg, cat)
            .then(function (id) {
                setSuccess(true);
                setLoading(false);
                props.history.push(ROUTES.VIEW_REPORT + id)
            })
            .catch(function (error) {
                console.error(error)
                setLoading(false);
            })
    };
    
    return (
        <PageLimit maxWidth="md">
            <Paper elevation={3} className={classes.formContainer}>
                <Typography component="h1" variant="h4" align="center">
                    Submit New Report
                </Typography>
                <Grid container direction="column" spacing={2} className={classes.formLayout}>
                    <Grid item>
                        <TextField label="Title"
                                   margin="dense"
                                   variant="filled"
                                   onChange={handleChange.title}
                                   fullWidth 
                                   helperText={CONFIG_VALUES.TITLE_HELP}/>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={3}>
                            <Grid item xs>
                                <FormSelector
                                    title="Urgency"
                                    value={urg}
                                    onChange={handleChange.urg}
                                    values={CONFIG_VALUES.URGENCY}
                                    helperText={CONFIG_VALUES.URGENCY_HELP}
                                />
                            </Grid>
                            <Grid item xs>
                                <FormSelector
                                    title="Category"
                                    value={cat}
                                    onChange={handleChange.cat}
                                    values={CONFIG_VALUES.CATEGORY}
                                    helperText={CONFIG_VALUES.CATEGORY_HELP}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextField label="Description"
                                   margin="dense"
                                   variant="filled"
                                   onChange={handleChange.desc}
                                   multiline
                                   rows={6} 
                                   fullWidth 
                                   helperText={CONFIG_VALUES.DESCRIPTION_HELP}/>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row">

                        </Grid>
                    </Grid>
                </Grid>
                <div className={classes.buttonContainer}>
                    <Tooltip title={tooltip}>
                        <div className={classes.buttonWrapper}>
                            <Button variant="contained" color="primary" disabled={loading || !valid} onClick={submit} className={buttonClassname}>
                                Submit
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </Tooltip>
                </div>
            </Paper>
        </PageLimit>
    )
}

export const CreateReport = withAuth(CONDITIONS.withAnyUser)(withManager(withRouter(CreateReportBase)))