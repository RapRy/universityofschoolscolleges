import React from 'react'
import { Container, Typography, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

import UsersList from './UsersList'

const BlacklistedUsersList = () => {
    const classes = useStyles()
    const { status, blacklistedUsers } = useSelector(state => state.users)

    return (
        <Container>
            <Typography className={classes.typoH2} variant="h2">Blacklisted Users</Typography>

            { (status === "loading" && blacklistedUsers.length === 0) && <LinearProgress style={{ margin: "30px 0" }} /> }

            <UsersList selectorName="blacklistedUsers" emptyMessage="No Blacklisted Users" />

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

export default BlacklistedUsersList
