import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography, Box, Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack'

import Input from '../Globals/Forms/Input';
import { sign_up, sign_in } from '../../redux/authReducer';

const initialState = { username: "", email: "", schoolId: "", password: "", confirmPassword: "" };
const initialErrors = { username: "", email: "", schoolId: "",  password: "", confirmPassword: "" };

const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { status, error } = useSelector(state => state.auth);

    const [formData, setFormData] = useState(initialState);
    const [switchForm, setSwitchForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);

    const classes = useStyles({ switchForm });

    const { enqueueSnackbar } = useSnackbar()

    const handleInputChange = (e) => {
        if(e.target.name === "schoolId"){
            if(isNaN(e.target.value)){
                e.target.value = e.target.value.replace(e.target.value.substr(e.target.value.length - 1), "");
            }else{
                setFormData({ ...formData, [e.target.name]: e.target.value })
                setErrors({ ...errors, [e.target.name]: "" })
            }
        }else{
            setFormData({ ...formData, [e.target.name]: e.target.value })
            setErrors({ ...errors, [e.target.name]: "" })
        }
    }

    const handleSwitchForm = () => {
        setSwitchForm(prevState => !prevState);
        setErrors(initialErrors);
        setFormData(initialState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(switchForm){
            if(formData.username === ""){
                setErrors({ ...errors, ['username']: "Field required." })
            }else if(formData.email === ""){
                setErrors({ ...errors, ['email']: "Field required." })
            }else if(formData.schoolId === ""){
                setErrors({ ...errors, ['schoolId']: "Field required." })
            }else if(formData.password === ""){
                setErrors({ ...errors, ['password']: "Field required." })
            }else if(formData.confirmPassword === ""){
                setErrors({ ...errors, ['confirmPassword']: "Field required." })
            }else if(formData.password.length > 8){
                setErrors({ ...errors, ['password']: "Password must be 8 characters." })
            }else if(formData.password !== formData.confirmPassword){
                setErrors({ ...errors, ['confirmPassword']: "Password didn't match." })
            }else{
                dispatch(sign_up(formData))
                enqueueSnackbar(`Sign up successful`, { variant: "success" })
            }
        }else{
            if(formData.email === ""){
                setErrors({ ...errors, ['email']: "Field required." })
            }else if(formData.password === ""){
                setErrors({ ...errors, ['password']: "Field required." })
            }else{
                const data = { formData, history }
                dispatch(sign_in(data))
            }
        }
    }

    useEffect(() => {

        if(localStorage.getItem('profile') !== null){
            history.push('/forum')
        }
    }, [dispatch]);

    return (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.mainContainer}>
            <Container maxWidth="md" className={classes.formContainer}>
                <Grid container direction="row">
                    <Grid item container direction="column" xs={12} md={6} justify="center" alignItems="center" className={classes.welcome}>
                        <Typography variant="h5" align="left" className={classes.h5}>University of Schools Colleges</Typography>
                        <Typography variant="h2" className={classes.h2}>Welcome to the Forum</Typography>
                        <Typography variant="body1" className={`${classes.pColorWhite} ${classes.paraghrap}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget rhoncus, convallis integer pulvinar eget nulla viverra quis. Quis leo a donec turpis non. Est, purus auctor viverra faucibus at nulla auctor eleifend odio.</Typography>
                        <Button onClick={() => handleSwitchForm()} size="large" disableRipple className={classes.button}>{ switchForm ? "SIGN IN" : "SIGN UP" }</Button>
                    </Grid>
                    <Grid item container justify="center" alignItems="center" direction="column" xs={12} md={6} className={classes.form}>
                        <Typography variant="h4" className={classes.h4}>{ switchForm ? "Create Account" : "Sign in to Forum" }</Typography>
                        <Typography variant="body1" className={`${classes.pColorBlack} ${classes.paraghrap}`}>{ switchForm ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : "Lorem ipsum dolor sit amet." }</Typography>
                        { error.login !== undefined &&  <Typography variant="body1" className={classes.paraghrapError}>{ error.login }</Typography>}        
                        <Backdrop open={status === "loading" ? true : false} style={{ zIndex: 5 }}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <form onSubmit={handleSubmit}>
                            { switchForm && <Input type={"text"} label={"Username"} name={"username"} errors={errors} handleInputChange={handleInputChange} /> }
                            <Input type={"email"} label={"Email"} name={"email"} errors={errors} handleInputChange={handleInputChange} />
                            { switchForm && <Input type={"text"} label={"Student ID"} name={"schoolId"} errors={errors} handleInputChange={handleInputChange} /> }
                            <Input type={"password"} label={"Password"} name={"password"} errors={errors} handleInputChange={handleInputChange} />
                            { switchForm &&  <Input type={"password"} label={"Confirm Password"} name={"confirmPassword"} errors={errors} handleInputChange={handleInputChange} />}
                            <Box textAlign="center" paddingTop="30px">
                                <Button type="submit" className={classes.button2}>{ switchForm ? "Create" : "Login" }</Button>
                            </Box>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        background: theme.palette.secondary.light
    },
    formContainer: {
        background: theme.palette.primary.contrastText,
        padding: 0,
        margin: "30px"
    },
    welcome: {
        background: props => props.switchForm ? theme.palette.primary.light : theme.palette.primary.main,
        padding: "20px",
        textAlign: 'center',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            padding: "20px 20px 60px"
        }
    },
    h5: {
        fontSize: "1.1rem",
        fontWeight: 900,
        color: theme.palette.secondary.contrastText,
        position: "absolute",
        top: "20px",
        left: "20px"
    },
    h2: {
        fontSize: "2.2rem",
        fontWeight: 700,
        color: theme.palette.secondary.contrastText,
        padding: "0px 80px 20px",
        [theme.breakpoints.down("sm")]: {
            padding: "60px 80px 20px"
        }
    },
    paraghrap: {
        fontSize: ".8rem",
        padding: "0px 20px 30px",
        lineHeight: "1.6"
    },
    pColorWhite: {
        color: theme.palette.secondary.contrastText,
    },
    pColorBlack: {
        color: theme.palette.secondary.main,
    },
    paraghrapError: {
        color: "#FF0000",
        fontSize: ".9rem",
        padding: "0px 20px 20px",
        fontWeight: 700
    },
    button: {
        borderRadius: "0px",
        margin: "0 auto",
        fontSize: ".95rem",
        fontWeight: 300,
        color: theme.palette.secondary.contrastText,
        padding: "7px 40px",
        border: `1px solid ${theme.palette.secondary.contrastText}`,
        '&:hover': {
            border: props => props.switchForm ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.light}`,
            background: 'none',
        }
    },
    button2: {
        borderRadius: "0px",
        margin: "0 auto",
        fontSize: ".95rem",
        fontWeight: 300,
        color: "#f2f2f2",
        padding: "7px 40px",
        background: theme.palette.primary.dark
    },
    h4: {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "#4f4f4f",
        paddingBottom: "10px"
    },
    form: {
        padding: "50px 50px",
    }
}))

export default Auth
