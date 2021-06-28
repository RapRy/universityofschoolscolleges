import React from 'react'
import { Button } from '@material-ui/core'
import { styled, makeStyles } from '@material-ui/core/styles'
import { Link, useRouteMatch } from 'react-router-dom'

const PanelButton = ({ opt }) => {
    const { url } = useRouteMatch()
    const classes = useStyles()

    return (
        <Link to={`${url}${opt._id !== "" ? `/${opt._id}` : ""}`} style={{ textDecoration: "none" }}>
            <Button fullWidth className={classes.btn}>{ opt.name }</Button>
        </Link>
    )
}

const useStyles = makeStyles(theme => ({
    btn: {
        background: theme.palette.primary.dark,
        borderRadius: "0",
        marginTop: "15px",
        textTransform: "unset",
        "&:hover":{
            background: theme.palette.secondary.dark
        },
        "& span": {
            textAlign: "left",
            justifyContent: "initial",
            color: theme.palette.secondary.contrastText,
            fontSize: ".9rem",
            textTransform: "capitalize"
        }
    }
}))

export default PanelButton
