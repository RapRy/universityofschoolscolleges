import React from 'react'
import { Button, Divider, Typography, Avatar, Box } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { logout } from '../../redux/authReducer';

const ProfileMenu = ({ max960 }) => {
    const { profile } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout(history))
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
                <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} onClick={handleLogout}>Logout</Button>
            </Box>
        </div>
    )
}

export default ProfileMenu
