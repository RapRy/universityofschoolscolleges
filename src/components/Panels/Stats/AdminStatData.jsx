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
        padding: "5px 25px",
        [theme.breakpoints.down('xs')]:{
            padding: "15px 0px"
        }
    },
    numType: {
        fontWeight: 900,
        fontSize: "2.6rem",
        color: "#4F4F4F",
        textAlign: "center",
        marginBottom: "10px",
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.8rem",
            marginBottom: "5px",
        },
        [theme.breakpoints.down('xs')]:{
            display: "inline-block",
            fontSize: "2rem"
        }
    },
    stringType: {
        fontWeight: 500,
        color: "#828282",
        textTransform: "uppercase",
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            fontSize: ".8rem",
        },
        [theme.breakpoints.down('xs')]:{
            display: "inline-block",
            fontSize: ".9rem",
            position: "relative",
            bottom: "6px",
            left: "10px"
        }
    }
}))

export default AdminStatData
