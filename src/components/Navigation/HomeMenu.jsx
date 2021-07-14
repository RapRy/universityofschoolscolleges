import React from 'react'
import { MenuList, MenuItem, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'

const HomeMenu = ({ aside }) => {
    const classes = useStyles({ aside })

    return (
        <MenuList className={classes.listContainer}>
            <MenuItem>
                <NavLink to="/" className={classes.linkStyle}>Home</NavLink>
            </MenuItem>
            { aside && <Divider /> }
            <MenuItem>
                <NavLink to="/forum" className={classes.linkStyle}>Forum</NavLink>
            </MenuItem>
            { aside && <Divider /> }
            <MenuItem>
                <NavLink to="/events" className={classes.linkStyle}>Events</NavLink>
            </MenuItem>
            { aside && <Divider /> }
            <MenuItem>
                <NavLink to="/announcements" className={classes.linkStyle}>Announcements</NavLink>
            </MenuItem>
            { aside && <Divider /> }
            <MenuItem>
                <NavLink to="/about" className={classes.linkStyle}>About</NavLink>
            </MenuItem>
            { aside && <Divider /> }
            <MenuItem>
                <NavLink to="/contact" className={classes.linkStyle}>Contact</NavLink>
            </MenuItem>
        </MenuList>
    )
}

const useStyles = makeStyles(theme => ({
    listContainer: {
        display: props => props.aside ? 'block': 'flex',
        justifyContent: props => !props.aside && 'flex-end',
        paddingTop: props => props.aside && theme.spacing(6),
        paddingRight: props => props.aside && theme.spacing(2),
        paddingLeft: props => props.aside && theme.spacing(2)
    },
    linkStyle: {
        textDecoration: "none",
        color: props => props.aside ? theme.palette.primary.main : theme.palette.secondary.contrastText,
        fontWeight: theme.typography.fontWeightMedium,
        paddingTop: props => props.aside && theme.spacing(1),
        paddingBottom: props => props.aside && theme.spacing(1),
        fontSize: ".9rem",
        '&:hover': {
            color: theme.palette.secondary.main
        }
    }
}))

export default HomeMenu
