import React from 'react'
import { Container, Typography, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

import UsersList from './UsersList'
import Empty from '../../Globals/Empty/Empty'

const ActiveUsersList = () => {
    const classes = useStyles()
    const { status, activeUsers } = useSelector(state => state.users)

    return (
        <Container>
            { (status === "loading" && activeUsers.length === 0) && <LinearProgress style={{ margin: "30px 0" }} /> }

            { (status === "idle" && activeUsers.length === 0) && <Empty message="No Registered Users" /> }

            <Typography className={classes.typoH2} variant="h2">Active Users</Typography>
            <UsersList selectorName="activeUsers" />
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    typoH2: {
        fontWeight: 700,
        fontSize: "1.2rem",
        marginTop: "40px",
        textTransform: "uppercase",
        color: theme.palette.secondary.dark
    }
}))

export default ActiveUsersList
