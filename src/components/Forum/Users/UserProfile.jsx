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
        <Container className={classes.container}>
            <Box>
                <Avatar className={classes.avatar}>{ user.username?.charAt(0) }</Avatar>
                <Typography className={classes.typoName}>{ user.name?.firstName || "First Name" } { user.name?.lastName || "Last Name" }</Typography>
                <Typography className={`${classes.typoWithIcon} ${classes.marginTop2}`}><AccountCircleIcon className={classes.typoIcon} /> { user.username }</Typography>
                <Typography className={`${classes.typoWithIcon} ${classes.marginTop1}`}><EmailIcon className={classes.typoIcon} /> { user.email }</Typography>
                <Box className={classes.marginTop2}>
                    <Typography className={classes.statNum}>{ user.post?.topics.length }</Typography>
                    <Typography className={classes.statSting}>{ user.post?.topics.length > 1 ? "Posts" : "Post" }</Typography>
                </Box>
                <Box className={classes.marginTop1}>
                    <Typography className={classes.statNum}>{ user.post?.replies.length }</Typography>
                    <Typography className={classes.statSting}>{ user.post?.replies.length > 1 ? "Replies" : "Reply" }</Typography>
                </Box>
            </Box>
            {
                (user._id === profileLs?._id || user._id === profile.result?._id) &&
                    <>
                        <Divider className={classes.divider} />
                        {
                            matchEdit !== null ?
                                <Link to={`/forum/profile/${user._id}`} style={{ textDecoration: "none" }}>
                                    <Button className={classes.button} variant="text" startIcon={<DescriptionIcon />}>Posts</Button>
                                </Link>
                            :
                                <Link to={`/forum/profile/edit/${user._id}`} style={{ textDecoration: "none" }}>
                                    <Button className={classes.button} variant="text" startIcon={<EditIcon />}>Edit Profile</Button>
                                </Link>
                                
                        }
                        <Button className={`${classes.button} ${classes.marginTop1}`} variant="text" startIcon={<ExitToAppIcon />}>Deactivate Account</Button>
                    </>

            }
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(5)
    },
    avatar: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        fontSize: theme.spacing(18),
    },
    marginTop2: {
        marginTop: theme.spacing(2)
    },
    marginTop1: {
        marginTop: theme.spacing(1)
    },
    typoName: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "1rem",
        marginTop: theme.spacing(2),
        color: theme.palette.secondary.dark
    },
    typoWithIcon: {
        color: theme.palette.secondary.dark,
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: ".8rem",

    },
    typoIcon: {
        verticalAlign: "middle",
        fontSize: "1.1rem"
    },
    statNum: {
        fontSize: "1.5rem",
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBlack,
        display: "inline-block",
        marginRight: theme.spacing(1)
    },
    statSting: {
        fontSize: ".9rem",
        color: theme.palette.secondary.dark,
        fontWeight: theme.typography.fontWeightBold,
        display: "inline-block"
    },
    divider: {
        margin: theme.spacing(3, 0)
    },
    button: {
        color: theme.palette.secondary.main,
        fontSize: ".85rem",
        fontWeight: theme.typography.fontWeightBold,
        textAlign: "left",
        display: "block"
    }
}))

export default UserProfile
