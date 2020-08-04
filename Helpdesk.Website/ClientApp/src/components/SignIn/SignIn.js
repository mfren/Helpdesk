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
    makeStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {withManager} from "../Manager";
import * as ROUTES from '../../constants/routes';


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
}));

function SignInBase(props) {
    
    const classes = useStyles();    // Use predefined CSS classes
        
    // Stores the Username entered into the text field
    const [user, setUser] = React.useState(""); // eslint-disable-line
    
    // Stores the Password entered into the text field
    const [pass, setPass] = React.useState(""); // eslint-disable-line
    
    // Stores the message that tells the user what went wrong
    const [msg, setMsg] = React.useState(""); // eslint-disable-line
    
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
        
        // This signs in the user, and if successful, pushes the user to the home page
        // If not, it sets the error message in a local state, which is shown on the page
        // TODO Implement parameter routing
        props.manager.signIn(user, pass)
            .then(() => props.history.push("/home"))
            .catch(error => setMsg(error.message))
            .then(() => console.log(props.manager.users()))
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
                    />
                    <Typography variant="body2">{msg}</Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
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
