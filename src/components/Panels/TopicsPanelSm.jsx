import React, { useEffect, useState } from 'react'
import { Container, List, ListItem, ListItemText, SvgIcon, ListItemIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PanelHeader from '../Globals/PanelHeader'


const TopicsPanelSm = ({ header, API, reduxDispatch, selectorName, icon }) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const topics = useSelector(state => state.topics)

    const match = useRouteMatch('/forum/:category/:topicId')

    useEffect(() => {
        const fetchTopics = async () => {
            const { data, status } = await API(match ? match.params.topicId : "");

            if(status === 200){
                dispatch(reduxDispatch(data))
            }
        }
        
        fetchTopics()
    }, [dispatch])

    const dateString = (date) => {
        const createdDate = new Date(date)

        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return `added on ${months[createdDate.getMonth()]} ${createdDate.getDate()}, ${createdDate.getFullYear()}`
    }

    const secondText = (header, latest, replies, related) => {
        switch(header){
            case "latest topics":
                return dateString(latest)
            case "hot topics":
                return `${replies.length} Replies`
            case "related topics":
                return dateString(related)
            default: 
                return null
        }
    }

    return (
        <Container style={{ padding: "0" }}>
            <PanelHeader title={header} />
            <List>
                {
                    topics[selectorName].map((top) => (
                        <ListItem key={top._id}>
                            <Link to={`forum`} style={{ textDecoration: "none", overflowX: "hidden" }}>
                                <ListItemText primary={top.title} classes={{ primary: classes.topicName }} />
                                <ListItemIcon classes={{ root: classes.listIcon }}>{icon}</ListItemIcon>
                                <ListItemText primary={secondText(header, top.createdAt, top.meta.replies, top.createdAt)} classes={{ root: classes.secondaryItem, primary: classes.secondaryTextItem }} />
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    topicName: {
        color: theme.palette.secondary.dark,
        fontSize: ".9rem",
        fontWeight: 700,
        whiteSpace: "nowrap",
        overflowX: 'hidden',
        textOverflow: "ellipsis"
    },
    listIcon: {
        display: "inline"
    },
    secondaryItem: {
        display: "inline-block"
    },
    secondaryTextItem: {
        fontSize: ".8rem",
        color: theme.palette.secondary.main,
        marginLeft: "5px"
    }
}))

export default TopicsPanelSm
