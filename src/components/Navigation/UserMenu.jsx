import React from 'react'
import { Grid, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

import SearchBar from './SearchBar'

const UserMenu = ({ setShowAside, showAside }) => {
    const classes = useStyles();

    const { profile } = useSelector(state => state.auth);

    return (
        <Grid container direction="row" spacing={2} alignItems="center" justify="flex-end">
            <Grid item xs={10}>
                <SearchBar />  
            </Grid>
            <Grid className={classes.avatar} item xs={1} container direction="row" justify="flex-end" alignItems="center" onClick={() => setShowAside(!showAside)}>
                <Avatar>{ profile.result?.username.charAt(0) }</Avatar>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    avatar: {
        marginLeft: theme.spacing(2)
    }
}))

export default UserMenu
