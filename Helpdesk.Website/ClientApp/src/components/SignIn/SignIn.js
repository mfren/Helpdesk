import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    makeStyles, CircularProgress
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {withManager} from "../Manager";
import * as ROUTES from '../../constants/routes';
import clsx from "clsx";
import green from "@material-ui/core/colors/green";
import {SwapCallsTwoTone} from "@material-ui/icons";


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttonWrapper: {
        margin: theme.spacing(3, 0, 2),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function SignInBase(props) {
    
    const classes = useStyles();    // Use predefined CSS classes
        
    // Stores the Username entered into the text field
    const [user, setUser] = React.useState("");
    
    // Stores the Password entered into the text field
    const [pass, setPass] = React.useState("");
    
    // Stores the message that tells the user what went wrong
    const [errors, setErrors] = React.useState({
        username: "",
        password: "",
    });
    
    // Handles the button loading wheel
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });
    
    // Changes the component state that holds the Username
    const handleUserChange = e => {
        setUser(e.target.value);
    }
    
    // Changes the component state that holds the Password
    const handlePassChange = e => {
        setPass(e.target.value);
    }
    
    const handleSubmit = event => {
        event.preventDefault();     // Prevents the event from pushing us to another page with URL params (default behaviour)
        
        setLoading(true)
        
        // This signs in the user, and if successful, pushes the user to the home page
        // If not, it sets the error message in a local state, which is shown on the page
        props.manager.signIn(user, pass)
            .then(() => props.history.push(ROUTES.HOME))
            .catch(error => {
                let newErrors = {
                    username: "",
                    password: "",
                }
                
                switch (error.code) {
                    case "auth/wrong-password":
                        newErrors.password = "Invalid password";
                        break;
                        
                    case "auth/user-not-found":
                        newErrors.username = "No user exists with that email";
                        break;

                    case "auth/network-request-failed":
                        newErrors.username = newErrors.password = "You are not connected to the internet";
                        break;

                    case "auth/too-many-requests":
                        newErrors.username = newErrors.password = "You have been blocked due to unusual activity";
                        break;

                    case "auth/user-disabled":
                        newErrors.username = newErrors.password = "Your account has been disabled";
                        break;
                    
                    default:
                        newErrors.username = newErrors.password = "Unknown Error";
                        console.log(error)
                }
                
                setErrors(newErrors);
                setLoading(false);
                setSuccess(false);
            })
    };
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign In</Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        onChange={handleUserChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={errors.username !== ""}
                        helperText={errors.username}
                    />
                    <TextField
                        onChange={handlePassChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={errors.password !== ""}
                        helperText={errors.password}
                    />
                    <div className={classes.buttonWrapper}>
                        <Button variant="contained" color="primary" fullWidth disabled={loading} type="submit" className={buttonClassname}>
                            Sign In
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href={ROUTES.SIGN_UP} variant="body2" onClick={ event => { event.preventDefault(); props.history.push(ROUTES.SIGN_UP) } }>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

// Add the Manager and Router context to the Component
export const SignIn = compose(
    withRouter,
    withManager
)(SignInBase);
