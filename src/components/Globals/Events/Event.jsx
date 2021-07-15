import React from 'react'
import { Divider, Typography, Grid, useMediaQuery, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Event = ({ event, ind, events }) => {
    const classes = useStyles()
    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const max900 = useMediaQuery(theme => theme.breakpoints.down('sm'))

    return (
        <>
            <Grid container direction="row" alignItems="center" spacing={2} className={classes.mainContainer}>
                <Grid item xs={12} sm={4} md={3}>
                    <Link to="/">
                        <img className={classes.img} src={`${process.env.PUBLIC_URL}/assets/${event.img}`} alt={event.title} />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={7} md={2}>
                    <Box display={max900 ? "inline-block" : "block"} paddingLeft={max900 && !max600 ? "20px" : 0}>
                        <Typography className={classes.day} variant="h2">{event.date.day}</Typography>
                        <Typography className={classes.month} variant="h6">{event.date.month}</Typography>
                    </Box>
                    {
                        (max900) && 
                            <Box display="inline-block" paddingLeft="20px">
                                <Link to="/" style={{ textDecoration: "none" }}>    
                                    <Typography className={classes.title} variant="h5">{event.title}</Typography>
                                </Link>
                                <Typography variant="body1" className={classes.time}>
                                    <AccessTimeIcon className={classes.icon} /> {`${event.date.startTime} - ${event.date.lastTime}`}
                                </Typography>
                                <Typography variant="body1" className={classes.location}>
                                    <LocationOnIcon className={classes.icon} /> {event.location}
                                </Typography>
                            </Box>
                    }
                </Grid>
                <Grid item xs={12} md={7}>
                    {
                        (!max900) &&
                            <>
                                <Link to="/" style={{ textDecoration: "none" }}>    
                                    <Typography className={classes.title} variant="h5">{event.title}</Typography>
                                </Link>
                                <Typography variant="body1" className={classes.time}>
                                    <AccessTimeIcon className={classes.icon} /> {`${event.date.startTime} - ${event.date.lastTime}`}
                                </Typography>
                                <Typography variant="body1" className={classes.location}>
                                    <LocationOnIcon className={classes.icon} /> {event.location}
                                </Typography>
                            </>
                    }
                    <Typography variant="body1" className={classes.description}>
                        {event.description}
                    </Typography>
                </Grid>
            </Grid>
            { ind !== (events.length - 1) && <Divider /> }
        </>
    )
}

const useStyles = makeStyles(theme => ({
    mainContainer: {
        padding: theme.spacing(4, 0)
    },
    img: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[7],
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    },
    day: {
        fontWeight: theme.typography.fontWeightBlack,
        color: theme.palette.primary.main,
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
            fontSize: "1.8rem",
            textAlign: "right",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "2rem",
            textAlign: "left",
        }
    },
    month: {
        fontWeight: theme.typography.fontWeightBlack,
        color: theme.palette.primary.main,
        textAlign: "center",
        fontSize: "1.1rem",
        [theme.breakpoints.down('xs')]: {
            fontSize: "1rem",
            textAlign: "right",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.2rem",
            textAlign: "left",
        }
    },
    title: {
        fontSize: "1rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: "1.2rem",
        }
    },
    icon:{
        fontSize: ".9rem",
        color: theme.palette.secondary.dark,
        position: "relative",
        top: "2px"
    },
    time: {
        fontSize: ".85rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.dark,
        marginBottom: theme.spacing(2),
        display: "inline-block",
        marginRight: theme.spacing(2)
    },
    location: {
        fontSize: ".85rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.dark,
        marginBottom: theme.spacing(2),
        display: "inline-block"
    },
    description: {
        fontSize: ".85rem",
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.primary.light,
    }
}))

export default Event
