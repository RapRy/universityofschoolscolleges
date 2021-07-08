import React, { useEffect, useState } from 'react'
import { Container, Avatar, Typography, Box, Divider, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as api from '../../../api'

const UserProfile = () => {
    const classes = useStyles()
    const [user, setUser] = useState({})

    const matchEdit = useRouteMatch('/forum/profile/edit/:userId')
    const matchProfile = useRouteMatch('/forum/profile/:userId')

    const { profile } = useSelector(state => state.auth)
    const profileLs = JSON.parse(localStorage.getItem('profile')).result

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, status } = await api.getUser(matchEdit?.params.userId || matchProfile?.params.userId)

                if(status === 200) setUser(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUser()

    }, [matchProfile?.params?.userId, matchEdit?.params?.userId])

    return (
        <Container>
            <Box textAlign="center">
                <Avatar className={classes.avatar}>{ user.username?.charAt(0) }</Avatar>
                <Typography>{ user.name?.firstName || "First Name" } { user.name?.lastName || "Last Name" }</Typography>
                <Typography><AccountCircleIcon /> { user.username }</Typography>
                <Typography><EmailIcon /> { user.email }</Typography>
                <Box>
                    <Typography>{ user.post?.topics.length }</Typography>
                    <Typography>{ user.post?.topics.length > 1 ? "Topics" : "Topic" }</Typography>
                </Box>
                <Box>
                    <Typography>{ user.post?.replies.length }</Typography>
                    <Typography>{ user.post?.replies.length > 1 ? "Replies" : "Reply" }</Typography>
                </Box>
            </Box>
            {
                (user._id === profileLs?._id || user._id === profile.result?._id) &&
                    <>
                        <Divider />
                        {
                            matchEdit !== null ?
                                <Link to={`/forum/profile/${user._id}`} style={{ textDecoration: "none" }}>
                                    <Button startIcon={<DescriptionIcon />}>Posts</Button>
                                </Link>
                            :
                                <Link to={`/forum/profile/edit/${user._id}`} style={{ textDecoration: "none" }}>
                                    <Button startIcon={<EditIcon />}>Edit Profile</Button>
                                </Link>
                                
                        }
                        <Button startIcon={<ExitToAppIcon />}>Deactivate Account</Button>
                    </>

            }
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        fontSize: theme.spacing(18),
        margin: '0 auto'
    }
}))

export default UserProfile
