import React from 'react'
import { Grid, TextField, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'

const SearchBar = () => {
    const classes = useStyles();

    return (
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
                                input: classes.input,
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <IconButton type="submit" className={classes.iconBtn}>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </form>
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
        color: theme.palette.secondary.dark,
        background: theme.palette.secondary.contrastText,
        borderRadius: "0px",
        padding: "10px 15px"
    },
    iconBtn: {
        background: theme.palette.primary.light,
        borderRadius: "0",
        marginLeft: "10px",
        height: "35px",
        color: theme.palette.primary.contrastText,
        '&:hover': {
            background: theme.palette.primary.light
        }
    }
}))

export default SearchBar
