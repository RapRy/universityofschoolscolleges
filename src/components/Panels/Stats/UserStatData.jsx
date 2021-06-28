import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const UserStatData = ({ numData, stringData }) => {
    const classes = useStyles();

    return (
        <Grid item>
            <Container className={classes.mainContainer}>
                <Typography variant="h2" className={classes.numType}>{numData}</Typography>
                <Typography variant="body1" className={classes.stringType}>{stringData}</Typography>
            </Container>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        padding: "15px 0px"
    },
    numType: {
        fontWeight: 900,
        fontSize: "2rem",
        color: theme.palette.primary.dark,
        display: "inline-block" 
    },
    stringType: {
        fontWeight: 500,
        fontSize: ".9rem",
        color: theme.palette.secondary.dark,
        textTransform: "uppercase",
        display: "inline-block",
        position: "relative",
        bottom: "6px",
        left: "10px"
    }
}))

export default UserStatData
