import React, { useState } from 'react'
import { AppBar, Typography, Container, Grid, useMediaQuery, Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';

import UserMenu from './UserMenu'
import ProfileMenu from './ProfileMenu'
import SearchBar from './SearchBar';
import HomeMenu from './HomeMenu';

const Navigation = ({ type }) => {
    const classes = useStyles({ type });
    const max960 = useMediaQuery('(max-width:960px)');
    const min600 = useMediaQuery('(min-width:600px)');

    const [showAside, setShowAside] = useState(false)

    return (
        <AppBar position="relative" className={classes.appBar}>
            <Container className={classes.container}>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={11} sm={5} md={6}>
                        <Typography variant="h5" className={classes.headerH5} display="inline">
                            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                                SCHOOL LOGO
                            </Link>
                            {type !== "" ? "   |" : ""}
                        </Typography>
                        {
                            type !== "" ?
                                <Link to="/forum" style={{ textDecoration: "none", color: "#fff" }}>
                                    <Typography className={classes.headerH6} variant="h6" display="inline">    THE FORUM</Typography>
                                </Link>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={1} sm={7} md={6}>
                    {
                        type !== "" ?
                            <Drawer anchor="right" open={showAside} onClose={() => setShowAside(prevState => !prevState)}>
                                <ProfileMenu max960={max960} setShowAside={setShowAside} />
                            </Drawer>
                        :
                            <Drawer anchor="right" open={showAside} onClose={() => setShowAside(prevState => !prevState)}>
                                <HomeMenu aside={true} />
                            </Drawer>
                    }
                        {
                            max960 === true ?
                                <Grid container direction="row" spacing={1} alignItems="center" justify="flex-end">
                                    {
                                        (min600 && type !== "") &&
                                            <Grid item sm={10} md={11} >
                                                <SearchBar />
                                            </Grid>
                                    }
                                    <Grid item xs={12} sm={2} md={1} style={{ textAlign: "right" }}>
                                        <MenuIcon className={classes.menuIcon} onClick={() => setShowAside(prevState => !prevState)} />
                                    </Grid>
                                </Grid>
                            :
                                <>
                                    {
                                        type !== "" ?
                                            <UserMenu setShowAside={setShowAside} showAside={showAside} />
                                        : <HomeMenu aside={false} />
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
        background: props => props.type !== "" ? theme.palette.primary.main : "transparent",
        boxShadow: "none"
    },
    container: {
        padding: theme.spacing(2, 3)
    },
    headerH5: {
        fontWeight: 700,
        fontSize: "1.3rem",
        color: theme.palette.secondary.contrastText
    },
    headerH6: {
        fontWeight: 500,
        fontSize: "1rem",
        color: theme.palette.secondary.contrastText
    },
    menuIcon: {
        fontSize: "2.5rem"
    }
}))

export default Navigation
