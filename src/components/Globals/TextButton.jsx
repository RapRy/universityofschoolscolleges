import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const TextButton = ({ text, link, margin }) => {
    const classes = useStyles({ margin })

    return (
        <Link to={link} style={{ textDecoration: "none" }}>
            <Button variant="contained" className={classes.root}>{ text }</Button>
        </Link>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: theme.shadows[0],
        padding: theme.spacing(1, 3),
        borderRadius: theme.shape.borderRadius,
        textTransform: "capitalize",
        fontSize: ".9rem",
        color: theme.palette.secondary.contrastText,
        background: theme.palette.secondary.main,
        marginRight: props => props.margin ? theme.spacing(3) : 0,
        '&:hover': {
            background: theme.palette.secondary.dark
        }
    }
}))

export default TextButton