import React from 'react'
import { Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { minWidth } from '@material-ui/system';

const Footer = () => {
    const classes = useStyles()

    return (
        <div className={classes.mainContainer}>
            <Container>
                <Grid container direction="row" spacing={2} justify="space-around">
                    <Grid item lg={4}>
                        <Typography variant="h4" className={classes.h4}>University od Schools Colleges</Typography>
                        <Typography variant="body1" className={classes.pGraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis</Typography>
                        <List component="ul">
                            <ListItem disableGutters classes={{ root: classes.teleList }}>
                                <ListItemIcon classes={{ root: classes.iconMinWidth }}><PhoneIcon className={classes.teleListIcon} /></ListItemIcon>
                                <ListItemText primary="(000) 000 - 0000)" classes={{ primary: classes.teleListText }} />
                            </ListItem>
                            <ListItem disableGutters classes={{ root: classes.teleList }}>
                                <ListItemIcon classes={{ root: classes.iconMinWidth }}><PhoneIcon className={classes.teleListIcon} /></ListItemIcon>
                                <ListItemText primary="(000) 000 - 0000)" classes={{ primary: classes.teleListText }} />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item lg={4} classes={{ item: classes.justifySelf }}>
                        <List component="ul" classes={{ root: classes.ulList }}>
                            <ListItem><Link to="/forum" ><ListItemText primary="The Forum" /></Link></ListItem>
                            <ListItem><Link to="#" ><ListItemText primary="Events" /></Link></ListItem>
                            <ListItem><Link to="#" ><ListItemText primary="Announcements" /></Link></ListItem>
                            <ListItem><Link to="#" ><ListItemText primary="Requirements" /></Link></ListItem>
                        </List>
                        <List component="ul" classes={{ root: classes.ulList }}>
                            <ListItem><Link to="#" ><ListItemText primary="Scholarships" /></Link></ListItem>
                            <ListItem><Link to="#" ><ListItemText primary="Vision and Mission" /></Link></ListItem>
                            <ListItem><Link to="#" ><ListItemText primary="Alumni" /></Link></ListItem>
                            <ListItem><Link to="#" ><ListItemText primary="About" /></Link></ListItem>
                        </List>
                    </Grid>
                    <Grid item lg={4} classes={{ item: classes.justifySelf }}>
                        <Typography variant="body1">Connect with us</Typography>
                        <IconButton>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton>
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography variant="body1">Copyright © 2021 University of Schools Colleges  All Rights Reserved</Typography>
            </Container>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    mainContainer: {
        background: theme.palette.primary.dark,
        marginTop: theme.spacing(10),
        padding: theme.spacing(6, 0)
    },
    h4: {
        color: theme.palette.secondary.contrastText,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "1.2rem",
        marginBottom: theme.spacing(1)
    },
    pGraph: {
        color: theme.palette.secondary.contrastText,
        fontSize: ".75rem"
    },
    teleList: {
        color: theme.palette.secondary.contrastText,

    },
    iconMinWidth: {
        minWidth: theme.spacing(3)
    },
    teleListIcon: {
        color: theme.palette.secondary.contrastText,
        fontSize: "1rem"
    },
    teleListText: {
        fontSize: ".9rem"
    },
    ulList: {
        display: 'inline-block'
    },
    justifySelf: {
        justifySelf: "center"
    }
}))

export default Footer
