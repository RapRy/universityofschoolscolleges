import React from 'react'
import { Grid, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

import SearchBar from './SearchBar'

const UserMenu = ({ setShowAside, showAside }) => {
    const classes = useStyles();

    const { profile } = useSelector(state => state.auth);

    return (
        <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs={9}>
                <SearchBar />  
            </Grid>
            <Grid item xs={3} container direction="row" justify="flex-end" alignItems="center" onClick={() => setShowAside(!showAside)}>
                <Typography variant="body1" className={classes.body1}>{profile.result?.username}</Typography>
                <Avatar />
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    body1: {
        display: "inline-block",
        marginRight: "15px",
        fontSize: ".95rem",
        color: theme.palette.primary.contrastText
    }
}))

export default UserMenu
