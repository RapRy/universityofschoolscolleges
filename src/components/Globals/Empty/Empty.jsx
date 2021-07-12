import React from 'react'
import { Container, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import { makeStyles } from '@material-ui/styles';

const Empty = ({ message }) => {
    const classes = useStyles()

    return (
        <Container style={{ textAlign: "center", marginTop: "50px" }}>
            <InboxIcon className={classes.icon} />
            <Typography variant="body1" className={classes.message}>{message}</Typography>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    icon: {
       fontSize: "6rem",
       color: theme.palette.primary.light
    },
    message: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "1.2rem",
        color: theme.palette.primary.light,
        marginTop: theme.spacing(1)
    }
}))

export default Empty
