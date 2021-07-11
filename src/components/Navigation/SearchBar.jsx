import React, { useState } from 'react'
import { InputBase } from '@material-ui/core'
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
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase 
                    type="text" 
                    name="search" 
                    placeholder="Search..."
                    fullWidth
                    onChange={handleInputChange}
                    classes={{
                        input: classes.input
                    }}
                />
            </div>
        </form>
    )
}

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.secondary.main,
        zIndex: 2
    },
    input: {
        fontSize: ".8rem",
        fontWeight: 500,
        width: "100%",
        color: theme.palette.secondary.dark,
        background: theme.palette.secondary.contrastText,
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        borderRadius: theme.shape.borderRadius
    },
}))

export default SearchBar
