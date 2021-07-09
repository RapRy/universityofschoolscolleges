import React, { useState } from 'react'
import { Grid, TextField, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'


const SearchBar = () => {
    const classes = useStyles();
    const history = useHistory()

    const [keyword, setKeyword] = useState({ search: "" })
    const [error, setError] = useState({ search: "" })

    const handleInputChange = (e) => {
        setKeyword({ search: e.target.value })
        setError({ search: "" })
    }

    const submitForm = (e) => {
        e.preventDefault()

        if(keyword.search === ""){
            setError({ search: "Field required." })
        }else{
            history.push(`/forum/search/${keyword.search.replace(" ", "-")}`)
        }
    }

    return (
        <form onSubmit={submitForm}>
            <Grid container direction="row" justify="flex-end">
                <Grid item xs={10}>
                    <TextField 
                        type="text" 
                        name="search" 
                        placeholder="Search..."
                        fullWidth
                        onChange={handleInputChange}
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
