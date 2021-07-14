import React, { useState, useEffect, createContext } from 'react';
import { Button, Container, Grid, Typography, Box, Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack'

import Input from '../Globals/Forms/Input';
import { sign_up, sign_in } from '../../redux/authReducer';
import { formContext } from './formContext';

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
                            <formContext.Provider value={{ switchForm }}>
                                { switchForm && <Input type={"text"} label={"Username"} name={"username"} errors={errors} handleInputChange={handleInputChange} value={formData.username} /> }
                                <Input type={"email"} label={"Email"} name={"email"} errors={errors} handleInputChange={handleInputChange} value={formData.email} />
                                { switchForm && <Input type={"text"} label={"Student ID"} name={"schoolId"} errors={errors} handleInputChange={handleInputChange} value={formData.schoolId} /> }
                                <Input type={"password"} label={"Password"} name={"password"} errors={errors} handleInputChange={handleInputChange} value={formData.password} />
                                { switchForm &&  <Input type={"password"} label={"Confirm Password"} name={"confirmPassword"} errors={errors} handleInputChange={handleInputChange} value={formData.confirmPassword} />}
                            </formContext.Provider>
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
        background: `url(${process.env.PUBLIC_URL}/assets/auth_bg.jpg)`,
        backgroundSize: "cover",
        minHeight: '100vh'
    },
    formContainer: {
        background: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[7],
        borderRadius: theme.shape.borderRadius,
        padding: 0,
        margin: theme.spacing(4),
        overflow: 'hidden'
    },
    welcome: {
        background: props => props.switchForm ? `url(${process.env.PUBLIC_URL}/assets/bg_orange.jpg)` : `url(${process.env.PUBLIC_URL}/assets/bg_blue.jpg)`,
        padding: theme.spacing(3),
        textAlign: 'center',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            padding: `${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(8)}px`
        }
    },
    h5: {
        fontSize: "1.1rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.contrastText,
        position: "absolute",
        top: theme.spacing(2),
        left: theme.spacing(2)
    },
    h2: {
        fontSize: "2.2rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.contrastText,
        padding: `0px ${theme.spacing(10)}px ${theme.spacing(3)}px`,
        [theme.breakpoints.down("sm")]: {
            padding: `${theme.spacing(8)}px ${theme.spacing(10)}px ${theme.spacing(3)}px`
        }
    },
    paraghrap: {
        fontSize: ".8rem",
        padding: `0px ${theme.spacing(2)}px ${theme.spacing(4)}px`,
        lineHeight: "1.6",
    },
    pColorWhite: {
        color: theme.palette.secondary.contrastText,
    },
    pColorBlack: {
        color: theme.palette.primary.light,
    },
    paraghrapError: {
        color: "#FF0000",
        fontSize: ".9rem",
        padding: "0px 20px 20px",
        fontWeight: 700
    },
    button: {
        borderRadius: theme.shape.borderRadius,
        margin: "0 auto",
        fontSize: ".95rem",
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(1, 5),
        border: `1px solid ${theme.palette.secondary.contrastText}`,
        '&:hover': {
            border: props => props.switchForm ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.primary.light}`,
            background: 'none',
        }
    },
    button2: {
        borderRadius: theme.shape.borderRadius,
        margin: "0 auto",
        fontSize: ".95rem",
        fontWeight: theme.typography.fontWeightLight,
        color: "#f2f2f2",
        padding: theme.spacing(1, 5),
        background: props => props.switchForm ? theme.palette.secondary.main : theme.palette.primary.main
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
