import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import MainHeader from '../Globals/MainHeader'
import Event from '../Globals/Events/Event'

const events = [
    { img: "event1.jpg", date: {
        month: 'June',
        day: 16,
        year: 2021,
        startTime: '8:00 am',
        lastTime: '12:30 pm'
    }, title: "Event Name 2021", location: "Event 1 Venue", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis iaculis lectus odio orci elit tempor urna eget. Ipsum, viverra lobortis tortor metus amet tellus dignissim nis." },
    {img: "event2.jpg", date: {
        month: 'July',
        day: 22,
        year: 2021,
        startTime: '9:00 am',
        lastTime: '2:30 pm'
    }, title: "Event Name 2021", location: "Event 2 Venue", description: "Felis iaculis lectus odio orci elit tempor urna eget. Ipsum, viverra lobortis tortor metus amet tellus dignissim nis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}
]

const UpcomingEvents = () => {
    const classes = useStyles()

    return (
        <Container className={classes.mainContainer}>
            <MainHeader heading="upcoming events" cta="view all" />
            {
                events.map((event, i) => <Event key={i} ind={i} event={event} events={events} />)
            }
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    mainContainer: {
        marginTop: theme.spacing(15)
    }
}))

export default UpcomingEvents
