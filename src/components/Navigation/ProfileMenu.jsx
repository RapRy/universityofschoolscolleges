import React from 'react'
import { Button, Divider, Typography, Avatar, Box } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { logout } from '../../redux/authReducer';

const ProfileMenu = ({ max960, setShowAside }) => {
    const { profile } = useSelector(state => state.auth)
    const profileLs = JSON.parse(localStorage.getItem('profile')).result
    const dispatch = useDispatch()

    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout(history))
    }

    const handleProfileClick = () => {
        setShowAside(prevState => !prevState)
    }

    return (
        <div style={{ width: "250px" }}>
            {
                max960 &&
                    <>
                        <Box>
                            <Avatar />  
                            <Typography>{profile.result?.username}</Typography>
                        </Box>
                        <Divider />
                    </>
            }
            <Box>
                <Link to={`/forum/profile/${profile.result?._id || profileLs?._id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" onClick={handleProfileClick}>Profile</Button>
                </Link>
                <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} onClick={handleLogout}>Logout</Button>
            </Box>
        </div>
    )
}

export default ProfileMenu
