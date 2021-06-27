import React from 'react'
import { Grid, TextField, IconButton, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'
import { useSelector } from 'react-redux'

const UserMenu = () => {
    const classes = useStyles();

    const { profile } = useSelector(state => state.auth);

    return (
        <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs={9}>
                <form>
                    <Grid container direction="row" justify="flex-end">
                        <Grid item xs={10}>
                            <TextField 
                                type="text" 
                                name="search" 
                                placeholder="Search..."
                                fullWidth
                                InputProps={{
                                    classes:{
                                        root: classes.rootRadius,
                                        input: classes.input
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={'auto'}>
                            <IconButton type="submit" className={classes.iconBtn}>
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={3} container direction="row" justify="flex-end" alignItems="center">
                <Typography variant="body1" className={classes.body1}>{profile.result?.username}</Typography>
                <Avatar />
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    rootRadius: {
        borderRadius: 0
    },
    notchedOutline: {
        borderColor: "transparent"
    },
    input: {
        fontSize: ".8rem",
        fontWeight: 500,
        color: theme.palette.secondary.main,
        background: theme.palette.primary.contrastText,
        borderRadius: "0px",
        padding: "10px 15px"
    },
    iconBtn: {
        background: theme.palette.primary.light,
        borderRadius: "0",
        marginLeft: "10px",
        height: "35px",
        color: theme.palette.primary.contrastText
    },
    body1: {
        display: "inline-block",
        marginRight: "15px",
        fontSize: ".95rem",
        color: theme.palette.primary.contrastText
    }
}))

export default UserMenu
