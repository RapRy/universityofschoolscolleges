import React from 'react'
import { Grid, TextField, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'
import { useSelector } from 'react-redux'

const UserMenu = () => {
    const classes = useStyles();

    const { profile } = useSelector(state => state.auth);

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={9}>
                <form>
                    <Grid container direction="row">
                        <Grid item xs={8}>
                            <TextField 
                                type="text" 
                                name="search" 
                                placeholder="Search..."
                                fullWidth
                                InputProps={{
                                    classes:{
                                        root: classes.rootRadius,
                                        notchedOutline: classes.notchedOutline,
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
            <Grid item xs={3}>
                <Typography variant="body1">{profile.result?.username}</Typography>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles({
    rootRadius: {
        borderRadius: 0
    },
    notchedOutline: {
        borderColor: "transparent"
    },
    input: {
        fontSize: ".8rem",
        fontWeight: 500,
        color: "#4f4f4f",
        background: "#f2f2f2",
        borderRadius: "0px",
        padding: "10px 15px"
    },
    iconBtn: {
        background: "#bdbdbd",
        borderRadius: "0",
        marginLeft: "10px",
        height: "35px",
        color: "#f2f2f2"
    }
})

export default UserMenu
