import React from 'react'
import { AppBar, Typography, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import UserMenu from './UserMenu'

const Navigation = ({ type }) => {
    const classes = useStyles();

    return (
        <AppBar position="relative" className={classes.appBar}>
            <Container className={classes.container}>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={6}>
                        <Typography variant="h5" className={classes.headerH5} display="inline">{`SCHOOL LOGO    ${type !== "" ? "|" : ""}`}</Typography>
                        {
                            type !== "" ?
                                <Typography className={classes.headerH6} variant="h6" display="inline">    THE FORUM</Typography>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={6}>
                        {
                            type !== "" ?
                                <UserMenu />
                            : ""
                        }
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}

const useStyles = makeStyles({
    appBar: {
        background: "#4f4f4f"
    },
    container: {
        padding:"15px 10px"
    },
    headerH5: {
        fontWeight: 700,
        fontSize: "1.3rem",
    },
    headerH6: {
        fontWeight: 500,
        fontSize: "1rem",
    }
})

export default Navigation
