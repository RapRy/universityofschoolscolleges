import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TableCell, TableHead, TableBody, IconButton, Collapse, Box, Typography, Table, Avatar } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PersonIcon from '@material-ui/icons/Person';
import BlockIcon from '@material-ui/icons/Block';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const UserDataList = ({ user, selectorName }) => {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const dateString = () => {
        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const updatedAt = new Date(user.updatedAt)
        const createdAt = new Date(user.createdAt)

        switch(selectorName){
            case "activeUsers":
                return `${months[updatedAt.getMonth()]} ${updatedAt.getDate()}, ${updatedAt.getFullYear()}`
            case "blacklistedUsers":
                return `${months[updatedAt.getMonth()]} ${updatedAt.getDate()}, ${updatedAt.getFullYear()}`
            default:
                return `${months[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()}`
        }
    }

    return (
        <>
            <TableRow className={classes.tableRowMain }>
                {
                    (selectorName === "activeUsers" || selectorName === "blacklistedUsers") && 
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                }
                <TableCell>
                    <Avatar>{ user.username.charAt(0) }</Avatar>
                </TableCell>
                <TableCell classes={{ root: classes.tableCellMainData }} align="left">{ user.schoolId }</TableCell>
                <TableCell classes={{ root: classes.tableCellMainData }} align="left">{user.username}</TableCell>
                <TableCell classes={{ root: classes.tableCellMainData }} align="left">{ user.email }</TableCell>
                <TableCell classes={{ root: classes.tableCellMainData }} align="left">{ dateString() }</TableCell>
                <TableCell align="left">
                    { (selectorName === "activeUsers" || selectorName === "blacklistedUsers") && <IconButton><PersonIcon /></IconButton> }
                    { selectorName === "activeUsers" && <IconButton><BlockIcon /></IconButton> }
                    { selectorName === "registeredUsers" && <IconButton><PersonAddIcon /></IconButton> }
                    { selectorName === "blacklistedUsers" && <IconButton><HowToRegIcon /></IconButton> }
                    <IconButton><DeleteForeverIcon /></IconButton>
                </TableCell>
            </TableRow>
            
            {
                (selectorName === "activeUsers" || selectorName === "blacklistedUsers") &&
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={(selectorName === "activeUsers" || selectorName === "blacklistedUsers") ? 7 : 6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        History
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total price ($)</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {"data goes here"}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
            }
        </>
    );
}

const useRowStyles = makeStyles(theme => ({
    tableRowMain: {
        background: theme.palette.secondary.contrastText,
        padding: theme.spacing(3),
        '& > *': {
            borderBottom: 'unset',
        },
    },
    tableCellMainData: {
        fontSize: ".8rem",
        color: theme.palette.secondary.dark,
        fontWeight: 700
    }
}))

export default UserDataList
