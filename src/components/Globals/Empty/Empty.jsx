import React from 'react'
import { Container, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

const Empty = ({ message }) => {
    return (
        <Container>
            <InboxIcon />
            <Typography variant="body1">{message}</Typography>
        </Container>
    )
}

export default Empty
