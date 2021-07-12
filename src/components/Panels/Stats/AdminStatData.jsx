import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const AdminStatData = ({ numData, stringData }) => {
    const classes = useStyles()

    return (
        <Grid item md={2} xs={12} sm={2}>
            <Container className={classes.mainContainer}>
                <Typography variant="h2" className={classes.numType}>{numData}</Typography>
                <Typography variant="body1" className={classes.stringType}>{stringData}</Typography>
            </Container>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        padding: theme.spacing(1, 3),
        [theme.breakpoints.down('xs')]:{
            padding: theme.spacing(2, 0)
        }
    },
    numType: {
        fontWeight: theme.typography.fontWeightBlack,
        fontSize: "2.6rem",
        color: theme.palette.primary.main,
        textAlign: "center",
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.8rem",
        },
        [theme.breakpoints.down('xs')]:{
            display: "inline-block",
            fontSize: "2rem"
        }
    },
    stringType: {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.secondary.dark,
        textTransform: "uppercase",
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            fontSize: ".8rem",
        },
        [theme.breakpoints.down('xs')]:{
            display: "inline-block",
            fontSize: ".9rem",
            position: "relative",
            bottom: theme.spacing(1) - 2,
            left: theme.spacing(1) + 2
        }
    }
}))

export default AdminStatData
