import React from 'react'
import { Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link, useRouteMatch } from 'react-router-dom'

import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
    const max600 = useMediaQuery(theme => theme.breakpoints.down('sm'))

    const matchHome = useRouteMatch("/")

    const classes = useStyles({ max600, matchHome })

    return (
        <div className={classes.mainContainer}>
            <Container>
                <Grid container direction="row" spacing={2} justify="space-between">
                    <Grid item xs={12} sm={12} lg={4}>
                        <Typography variant="h4" className={classes.h4}>University of Schools Colleges</Typography>
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
                    <Grid item xs={12} sm={6} lg={4} classes={{ item: classes.globMargTop }}>
                        <List component="ul" classes={{ root: classes.ulList }}>
                            <ListItem classes={{ root: classes.teleList }}><Link to="/forum" className={classes.textDecor}><ListItemText classes={{ primary: classes.linkList }} primary="The Forum" /></Link></ListItem>
                            <ListItem classes={{ root: classes.teleList }}><Link to="#" className={classes.textDecor}><ListItemText classes={{ primary: classes.linkList }} primary="Events" /></Link></ListItem>
                            <ListItem classes={{ root: classes.teleList }}><Link to="#" className={classes.textDecor}><ListItemText classes={{ primary: classes.linkList }} primary="Announcements" /></Link></ListItem>
                            <ListItem classes={{ root: classes.teleList }}><Link to="#" className={classes.textDecor}><ListItemText classes={{ primary: classes.linkList }} primary="Requirements" /></Link></ListItem>
                        </List>
                        <List component="ul" classes={{ root: classes.ulList }}>
                            <ListItem classes={{ root: classes.teleList }}><Link to="#" className={classes.textDecor}><ListItemText classes={{ primary: classes.linkList }} primary="Scholarships" /></Link></ListItem>
                            <ListItem classes={{ root: classes.teleList }}><Link to="#" className={classes.textDecor}><ListItemText classes={{ primary: classes.linkList }} primary="Vision and Mission" /></Link></ListItem>
                            <ListItem classes={{ root: classes.teleList }}><Link to="#" className={classes.textDecor}><ListItemText classes={{ primary: classes.linkList }} primary="Alumni" /></Link></ListItem>
                            <ListItem classes={{ root: classes.teleList }}><Link to="#" className={classes.textDecor}><ListItemText classes={{ primary: classes.linkList }} primary="About" /></Link></ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={2} classes={{ item: classes.globMargTop }}>
                        <Typography variant="body1" className={classes.connectTitle}>Connect with us</Typography>
                        <IconButton classes={{ root: classes.socialButtons }}>
                            <FacebookIcon className={classes.socialIcons} />
                        </IconButton>
                        <IconButton classes={{ root: classes.socialButtons }}>
                            <LinkedInIcon className={classes.socialIcons} />
                        </IconButton>
                        <IconButton classes={{ root: classes.socialButtons }}>
                            <TwitterIcon className={classes.socialIcons} />
                        </IconButton>
                        <IconButton classes={{ root: classes.socialButtons }}>
                            <InstagramIcon className={classes.socialIcons} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography variant="body1" className={classes.copyright}>Copyright © 2021 University of Schools Colleges  All Rights Reserved</Typography>
            </Container>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    mainContainer: {
        background: theme.palette.primary.dark,
        marginTop: props => props.matchHome.isExact ? theme.spacing(0) : theme.spacing(10),
        padding: theme.spacing(6, 0),
    },
    h4: {
        color: theme.palette.secondary.contrastText,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "1.2rem",
        marginBottom: theme.spacing(1)
    },
    globMargTop: {
        marginTop: props => props.max600 ? theme.spacing(3) : theme.spacing(0)
    },
    pGraph: {
        color: theme.palette.secondary.contrastText,
        fontSize: ".75rem"
    },
    teleList: {
        color: theme.palette.secondary.contrastText,
        padding: 0

    },
    iconMinWidth: {
        minWidth: theme.spacing(3)
    },
    teleListIcon: {
        color: theme.palette.secondary.contrastText,
        fontSize: ".9rem"
    },
    teleListText: {
        fontSize: ".85rem"
    },
    ulList: {
        display: 'inline-block',
        padding: theme.spacing(0, 2),
        '&:first-child': {
            paddingLeft: theme.spacing(0)
        },
        '&:last-child': {
            paddingRight: theme.spacing(0)
        }
    },
    textDecor: {
        textDecoration: "none"
    },
    linkList: {
        color: theme.palette.secondary.contrastText,
        fontSize: ".9rem",
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    connectTitle: {
        color: theme.palette.secondary.contrastText,
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: ".95rem",
    },
    socialButtons: {
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius
    },
    socialIcons: {
        color: theme.palette.secondary.contrastText,
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    copyright: {
        color: theme.palette.secondary.contrastText,
        fontSize: '.7rem',
        textAlign: "center",
        marginTop: theme.spacing(6)
    }
}))

export default Footer
