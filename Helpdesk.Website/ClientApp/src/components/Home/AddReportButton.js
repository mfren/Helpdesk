import React from 'react';
import {withRouter} from 'react-router-dom';
import {Fab, Typography, makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import * as ROUTES from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
    btnText: {
        marginRight: theme.spacing(1),
        fontSize: "1rem",
        fontWeight: "700",
    },
    fab: {
        textTransform: "none",  // Prevents the FAB's text from being capitalized
    },
}));

function AddReportButton(props) {
    const classes = useStyles();
    return (
        <Fab variant="extended"
             color="secondary"
             aria-label="add"
             size="medium"
             onClick={() => props.history.push(ROUTES.NEW_REPORT)}
             className={classes.fab}>
            <AddIcon className={classes.btnIcon}/>
            <Typography variant="h6" className={classes.btnText}>Report Problem</Typography>
        </Fab>
    )
}

export default withRouter(AddReportButton)