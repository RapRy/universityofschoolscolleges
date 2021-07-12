import React from 'react'
import { Container, Avatar, Divider, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';

const UserThumbnailPanel = ({ user, type }) => {
    const classes = useStyles()

    const dateString = () => {
        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const updatedAt = new Date(user.updatedAt)
        const createdAt = new Date(user.createdAt)

        if(type === "activeUsers") return `last activity on ${months[updatedAt.getMonth()]} ${updatedAt.getDate()}, ${updatedAt.getFullYear()}`

        return `joined on ${months[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()}`

    }


    return (
        <>
            <Container className={classes.mainContainer}>
                <Grid container direction="row" alignItems="center">
                    <Grid item lg={2} md={3} sm={2} xs={3}>
                        <Avatar className={classes.avatar}>{ user.username.charAt(0) }</Avatar>
                    </Grid>
                    <Grid item lg={9} md={8} sm={9} xs={8}>
                        <Typography className={classes.data}><AccountBoxIcon className={classes.icon} /> { user.username }</Typography>
                        <Typography className={classes.data}><EmailIcon className={classes.icon} /> { user.email }</Typography>
                        <Typography className={classes.date}>{ dateString() }</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Divider />
        </>
    )
}

const useStyles = makeStyles(theme => ({
    mainContainer: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    avatar: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        marginRight: theme.spacing(1)
    },
    data: {
        display: "block",
        fontSize: ".9rem",
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing(1),
        color: theme.palette.secondary.dark
    },
    icon: {
        verticalAlign: "middle",
        fontSize: "1.2rem",
        color: theme.palette.secondary.dark
    },
    date: {
        fontSize: ".85rem",
        color: theme.palette.primary.light
    }
}))

export default UserThumbnailPanel
