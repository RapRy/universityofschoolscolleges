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

const useStyles = makeStyles({
    btn: {
        borderRadius: "0px",
        marginLeft: "10px",
        fontSize: ".85rem",
        fontWeight: 300,
        color: "#f2f2f2",
        padding: "5px 15px",
        background: "#828282"
    }
})

export default IconBtn
