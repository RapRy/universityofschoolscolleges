import React, { useState } from 'react'
import { Button, Container, Grid, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'

import Input from './Input'

const useStyles = makeStyles({
    mainContainer: {
        background: "#c4c4c4",
        height: "100vh"
    },
    formContainer: {
        background: "#fff",
        padding: 0,
        margin: "0px 30px"
    },
    welcome: {
        background: "#f2f2f2",
        padding: "20px",
        textAlign: 'center',
        position: 'relative'
    },
    h5: {
        fontSize: "1.1rem",
        fontWeight: 900,
        color: "#828282",
        position: "absolute",
        top: "20px",
        left: "20px"
    },
    h2: {
        fontSize: "2.2rem",
        fontWeight: 700,
        color: "#4f4f4f",
        padding: "0px 80px 20px"
    },
    paraghrap: {
        color: "#4f4f4f",
        fontSize: ".8rem",
        padding: "0px 20px 30px",
        lineHeight: "1.6"
    },
    button: {
        borderRadius: "0px",
        margin: "0 auto",
        fontSize: ".95rem",
        fontWeight: 300,
        color: "#828282",
        padding: "7px 40px"
    },
    button2: {
        borderRadius: "0px",
        margin: "0 auto",
        fontSize: ".95rem",
        fontWeight: 300,
        color: "#f2f2f2",
        padding: "7px 40px",
        background: "#828282"
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
})

const initialState = { username: "", email: "", schoolId: "", password: "", confirmPassword: "" }

const Auth = () => {
    const classes = useStyles();

    const [formData, setFormData] = useState(initialState);
    const [switchForm, setSwitchForm] = useState(false)

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/users/signup', formData)
    }


    return (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.mainContainer}>
            <Container maxWidth="md" className={classes.formContainer}>
                <Grid container direction="row">
                    <Grid item container direction="column" xs={12} md={6} justify="center" alignItems="center" className={classes.welcome}>
                        <Typography variant="h5" align="left" className={classes.h5}>University of Schools Colleges</Typography>
                        <Typography variant="h2" className={classes.h2}>Welcome to the Forum</Typography>
                        <Typography variant="body1" className={classes.paraghrap}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget rhoncus, convallis integer pulvinar eget nulla viverra quis. Quis leo a donec turpis non. Est, purus auctor viverra faucibus at nulla auctor eleifend odio.</Typography>
                        <Button onClick={() => setSwitchForm(prevState => !prevState)} variant="outlined" size="large" disableRipple className={classes.button}>{ switchForm ? "SIGN IN" : "SIGN UP" }</Button>
                    </Grid>
                    <Grid item container justify="center" alignItems="center" direction="column" xs={12} md={6} className={classes.form}>
                        <Typography variant="h4" className={classes.h4}>{ switchForm ? "Create Account" : "Sign in to Forum" }</Typography>
                        <Typography variant="body1" className={classes.paraghrap}>{ switchForm ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : "Lorem ipsum dolor sit amet." }</Typography>
                        <form onSubmit={handleSubmit}>
                            { switchForm && <Input type={"text"} label={"Username"} name={"username"} handleInputChange={handleInputChange} /> }
                            <Input type={"email"} label={"Email"} name={"email"} handleInputChange={handleInputChange} />
                            { switchForm && <Input type={"text"} label={"Student ID"} name={"schoolId"} handleInputChange={handleInputChange} /> }
                            <Input type={"password"} label={"Password"} name={"password"} handleInputChange={handleInputChange} />
                            { switchForm &&  <Input type={"password"} label={"Confirm Password"} name={"confirmPassword"} handleInputChange={handleInputChange} />}
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

export default Auth
