import React from 'react';
import { withRouter } from "react-router-dom";
import { 
    Typography, 
    Container, 
    Link, 
    Grid, 
    Box, 
    Checkbox, 
    FormControlLabel, 
    TextField, 
    CssBaseline, 
    Avatar, 
    Button, 
    makeStyles 
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withManager from "../Manager/withManager";
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUpBase = (props) => {
    const classes = useStyles();

    // Component states
    const [fname, setFName] = React.useState("");
    const [lname, setLName] = React.useState("");
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [admin, setAdmin] = React.useState(false);
    
    // These functions are provided as a prop to the text-fields.
    // When called, they take the component's value and stores
    // it in this component's state
    const handleFNameChange = event => setFName(event.target.value);
    const handleLNameChange = event => setLName(event.target.value);
    const handleUserChange = event => setUser(event.target.value);
    const handlePassChange = event => setPass(event.target.value);
    const handleAdminChange = event => setAdmin(event.target.checked);
    
    // Make sure that the inputs are valid
    
    
    
    const handleSubmit = event => {
        // This prevents the default event from happening
        event.preventDefault();

        const roles = {};
        roles[ROLES.ADMIN] = admin;
        
        props.manager.signOut()
            .then(() => props.manager.createUser(user, pass))
            .then(userCred => {
                // Create a user in the DB
                return props.manager
                    .user(userCred.user.uid)
                    .set({
                        email: userCred.user.email,
                        roles,
                    })
            })
            .then(() => props.history.push(ROUTES.HOME))
            .catch(error => console.log(error.message))
    };
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleFNameChange}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleLNameChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleUserChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handlePassChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        
                        {/* TODO Remove */}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox onChange={handleAdminChange} color="primary" />}
                                label="Admin Access"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export const SignUp = withRouter(withManager(SignUpBase));