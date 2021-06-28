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
        borderRadius: "0px",
        marginLeft: "10px",
        fontSize: ".85rem",
        fontWeight: 300,
        color: theme.palette.secondary.contrastText,
        padding: "5px 15px",
        background: theme.palette.primary.main,
        '&:hover': {
            background: theme.palette.primary.main
        }
    }
}))

export default IconBtn
