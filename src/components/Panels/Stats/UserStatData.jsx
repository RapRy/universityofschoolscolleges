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
        padding: theme.spacing(2, 0)
    },
    numType: {
        fontWeight: theme.typography.fontWeightBlack,
        fontSize: "2rem",
        color: theme.palette.primary.main,
        display: "inline-block" 
    },
    stringType: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: ".9rem",
        color: theme.palette.secondary.dark,
        textTransform: "uppercase",
        display: "inline-block",
        position: "relative",
        bottom: theme.spacing(1) - 2,
        left: theme.spacing(1) + 2
    }
}))

export default UserStatData
