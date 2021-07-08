import React, { useState } from 'react'
import { AppBar, Typography, Container, Grid, useMediaQuery, Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MenuIcon from '@material-ui/icons/Menu';

import UserMenu from './UserMenu'
import ProfileMenu from './ProfileMenu'
import SearchBar from './SearchBar';

const Navigation = ({ type }) => {
    const classes = useStyles();
    const max960 = useMediaQuery('(max-width:960px)');

    const [showAside, setShowAside] = useState(false)

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
                    <Drawer anchor="right" open={showAside} onClose={() => setShowAside(prevState => !prevState)}>
                        <ProfileMenu max960={max960} setShowAside={setShowAside} />
                    </Drawer>
                        {
                            max960 === true ?
                            <Grid container direction="row" spacing={1} alignItems="center">
                                <Grid item xs={11}>
                                    <SearchBar />
                                </Grid>
                                <Grid item xs={1}>
                                    <MenuIcon onClick={() => setShowAside(prevState => !prevState)} />
                                </Grid>
                            </Grid>
                            :
                                <>
                                    {
                                        type !== "" ?
                                            <UserMenu setShowAside={setShowAside} showAside={showAside} />
                                        : ""
                                    }
                                </>
                        }
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.primary.color1
    },
    container: {
        padding:"15px 10px"
    },
    headerH5: {
        fontWeight: 700,
        fontSize: "1.3rem",
        color: theme.palette.primary.contrastText
    },
    headerH6: {
        fontWeight: 500,
        fontSize: "1rem",
        color: theme.palette.primary.contrastText
    }
}))

export default Navigation
