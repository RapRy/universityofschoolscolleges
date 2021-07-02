import React, { useEffect, useState } from 'react'
import { Container, Avatar, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Moment from 'react-moment'

import * as api from '../../../api'

const Reply = ({ reply }) => {
    const classes = useStyles()

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
    }, [reply._id])

    return (
        <Container className={classes.container}>
            <Grid container direction="row" spacing={2}>
                <Grid item>
                    <Avatar>{ user.username?.charAt(0) }</Avatar>
                </Grid>
                <Grid item>
                    <div>
                        <Typography variant="h5" className={classes.username}>{ user.username }</Typography>
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
        marginBottom: theme.spacing(2)
    },
    username: {
        display: "inline-block",
        fontWeight: 700,
        fontSize: ".85rem",
        marginRight: theme.spacing(1),
        color: theme.palette.secondary.dark
    },
    timestamp: {
        color: theme.palette.secondary.main,
        display: "inline-block",
        fontSize: ".75rem"
    },
    reply: {
        color: theme.palette.secondary.dark,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        fontSize: ".9rem"
    }
}))

export default Reply
