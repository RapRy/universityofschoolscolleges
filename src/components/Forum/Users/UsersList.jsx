import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import UserDataList from './UserDataList';
import { active_users_list, registered_users_list } from '../../../redux/usersReducer'

const  UsersList = ({ selectorName }) => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const classes = useStyles()

    useEffect(() => {
        switch(selectorName){
            case "activeUsers":
                dispatch(active_users_list(0))
                break
            default:
                dispatch(registered_users_list())
                break
        }
    }, [dispatch])

    return (
        <TableContainer classes={{ root: classes.tableContainer }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        { 
                            (selectorName === "activeUsers" || selectorName === "blacklistedUsers") && 
                                <TableCell classes={{ root: classes.cell }} />
                        }
                        <TableCell classes={{ root: classes.cell }} />
                        <TableCell classes={{ root: classes.cell }} align="left">ID</TableCell>
                        <TableCell classes={{ root: classes.cell }} align="left">Username</TableCell>
                        <TableCell classes={{ root: classes.cell }} align="left">Email</TableCell>
                        <TableCell classes={{ root: classes.cell }} align="left">Latest Activity</TableCell>
                        <TableCell classes={{ root: classes.cell }} align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {users[selectorName].map((user) => (
                    <UserDataList key={user._id} user={user} selectorName={selectorName} />
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const useStyles = makeStyles(theme => ({
    tableContainer: {
        background: theme.palette.secondary.light,
        marginTop: theme.spacing(3),
        padding: theme.spacing(3)
    },
    cell: {
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        fontSize: '.8rem',
        fontWeight: 500
    }
}))

export default UsersList
