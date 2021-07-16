import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

const FourOFour = () => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <img src={`${process.env.PUBLIC_URL}/assets/404.png`} alt="404" className={classes.img} /> 
            <Typography variant="h2" className={classes.text404}>404</Typography>
            <Typography variant="body1" className={classes.descrip}>UH OH! You're Lost.</Typography>
            <Link to="/" className={classes.link}>back to home page</Link>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        textAlign: "center",
        position: "relative",
        top: "-50%",
        left: 0,
        transform: "translateY(50%)"
    },
    img: {
        width: "80%",
        height: "80%"
    },
    text404: {
        fontWeight: theme.typography.fontWeightBold,
        marginTop: theme.spacing(2),
        fontSize: "6rem",
        color: theme.palette.primary.main
    },
    descrip: {
        fontSize: "1.3rem",
        color: theme.palette.secondary.dark,
        marginBottom: theme.spacing(5)
    },
    link: {
        fontFamily: theme.typography.fontFamily,
        textDecoration: "none",
        color: theme.palette.secondary.main,
        fontSize: ".9rem",
        textTransform: "uppercase",
        '&:hover': {
            color: theme.palette.secondary.dark
        }
    }
}))

export default FourOFour
