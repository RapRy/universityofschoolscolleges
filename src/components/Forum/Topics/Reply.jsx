import React, { useEffect, useState } from 'react'
import { Container, Avatar, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import * as api from '../../../api'

const Reply = ({ reply }) => {
    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const classes = useStyles({ max600 })

    const [user, setUser] = useState({})

    useEffect(() => {
        try {
            const fetchUser = async () => {
                const { data, status } = await api.getUser(reply.ref.creator)

                if(status === 200) setUser(data)
            }

            fetchUser()
        } catch (error) {
            console.log(error)
        }

        return () => {
            setUser({})
        }
    }, [reply._id])

    return (
        <Container className={classes.container}>
            <Grid container direction="row" spacing={1}>
                <Grid item md={"auto"}>
                    <Link to={`/forum/profile/${user._id}`} style={{ textDecoration: "none" }}>
                        <Avatar className={classes.avatar}>{ user.username?.charAt(0) }</Avatar>
                    </Link>
                </Grid>
                <Grid item md={11}>
                    <div>
                        <Link to={`/forum/profile/${user._id}`} style={{ textDecoration: "none" }}>
                            <Typography variant="h5" className={classes.username}>{ user.username }</Typography>
                        </Link>
                        <Typography variant="body1" className={classes.timestamp}>
                            <Moment fromNow>{ reply.createdAt }</Moment>
                        </Typography>
                    </div>
                    <Typography variant="body1" className={classes.reply}>{ reply.reply }</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.secondary.contrastText,
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        borderRadius: theme.shape.borderRadius
    },
    avatar: {
        width: props => props.max600 && theme.spacing(4),
        height: props => props.max600 && theme.spacing(4)
    },
    username: {
        display: "inline-block",
        fontWeight: theme.typography.fontWeightBold,
        fontSize: ".85rem",
        marginRight: theme.spacing(1),
        color: theme.palette.secondary.dark
    },
    timestamp: {
        color: theme.palette.primary.light,
        display: "inline-block",
        fontSize: ".75rem"
    },
    reply: {
        color: theme.palette.secondary.dark,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        fontSize: ".9rem",
        wordBreak: "break-all"
    }
}))

export default Reply
