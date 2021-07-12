import React from 'react'
import { Button, Divider, Typography, Avatar, Box } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';

import { logout } from '../../redux/authReducer';

const ProfileMenu = ({ max960, setShowAside }) => {
    const { profile } = useSelector(state => state.auth)
    const profileLs = JSON.parse(localStorage.getItem('profile')).result
    const dispatch = useDispatch()

    const classes = useStyles()

    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout(history))
    }

    const handleProfileClick = () => {
        setShowAside(prevState => !prevState)
    }

    return (
        <div className={classes.container}>
            {
                max960 &&
                    <>
                        <Box>
                            <Avatar />  
                            <Typography>{profile.result?.username}</Typography>
                        </Box>
                        <Divider className={classes.divider} />
                    </>
            }
            <Box>
                <Link to={`/forum/profile/${profile.result?._id || profileLs?._id}`} style={{ textDecoration: "none" }}>
                    <Button variant="text" color="secondary" startIcon={<AccountCircleIcon />} onClick={handleProfileClick}>My Profile</Button>
                </Link>
                <Divider className={classes.divider} />
                <Button variant="text" color="secondary" startIcon={<ExitToAppIcon />} onClick={handleLogout}>Log Out</Button>
            </Box>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        width: "250px",
        padding: theme.spacing(2)
    },
    divider:{
        margin: theme.spacing(1, 0)
    }
}))

export default ProfileMenu
