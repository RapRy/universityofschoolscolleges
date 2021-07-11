import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

const IconBtn = ({ icon, text, handleClick }) => {
    const classes = useStyles()

    return (
        <Button className={classes.btn} startIcon={icon} onClick={handleClick}>
            {text}
        </Button>
    )
}

const useStyles = makeStyles(theme => ({
    btn: {
        borderRadius: theme.shape.borderRadius,
        marginLeft: theme.spacing(1),
        fontSize: ".85rem",
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(1, 3),
        background: theme.palette.secondary.main,
        '&:hover': {
            background: theme.palette.secondary.dark
        }
    }
}))

export default IconBtn
