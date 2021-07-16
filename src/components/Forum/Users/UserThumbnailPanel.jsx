import React from 'react'
import { Container, Avatar, Divider, Typography, Grid, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import { Link } from 'react-router-dom'

const UserThumbnailPanel = ({ user, type }) => {
    const max600 = useMediaQuery(theme => theme.breakpoints.down('sm'))
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
                <Grid container direction="row" spacing={2} alignItems="flex-start">
                    <Grid item xs={'auto'}>
                        <Link to={`/forum/profile/${user._id}`} style={{ textDecoration: "none" }}>
                            <Avatar className={classes.avatar}>{ user.username.charAt(0) }</Avatar>
                        </Link>
                    </Grid>
                    <Grid item lg={9} md={8} sm={9} xs={9}>
                        <Link to={`/forum/profile/${user._id}`} style={{ textDecoration: "none" }}>
                            <Typography className={classes.data}><AccountBoxIcon className={classes.icon} /> { user.username }</Typography>
                        </Link>
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
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(6),
            height: theme.spacing(6)
        }
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
