import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const MainHeader = ({ heading }) => {
    const classes = useStyles()

    return (
        <Typography variant="h3" className={classes.header}>{heading}</Typography>
    )
}

const useStyles = makeStyles(theme => ({
    header: {
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBlack,
        color: theme.palette.secondary.dark,
        fontSize: "1.1rem",
        marginBottom: theme.spacing(3)
    }
}))

export default MainHeader
