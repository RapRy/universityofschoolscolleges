import React from 'react'
import { Container, List, ListItem, ListItemText, SvgIcon, ListItemIcon } from '@material-ui/core'
import { Link } from 'react-router-dom'
import TodayIcon from '@material-ui/icons/Today'
import CommentIcon from '@material-ui/icons/Comment'


import PanelHeader from '../Globals/PanelHeader'

const topics = {
    latest: [
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "added on June 27, 2021", icon: TodayIcon },
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "added on June 27, 2021", icon: TodayIcon },
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "added on June 27, 2021", icon: TodayIcon },
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "added on June 27, 2021", icon: TodayIcon },
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "added on June 27, 2021", icon: TodayIcon }
    ],
    hot: [
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "300 replies", icon: CommentIcon },
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "300 replies", icon: CommentIcon },
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "300 replies", icon: CommentIcon },
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "300 replies", icon: CommentIcon },
        { primary: "Lorem ipsum dolor sit amet dui et.", secondary: "300 replies", icon: CommentIcon }
    ]
}

const TopicsPanelSm = ({ header, request }) => {
    return (
        <Container style={{ padding: "0" }}>
            <PanelHeader title={header} />
            <List>
                {
                    topics[request].map((top, i) => (
                        <ListItem key={i}>
                            <Link to={`forum`} style={{ textDecoration: "none" }}>
                                <ListItemText primary={top.primary} />
                                <ListItemIcon><SvgIcon component={top.icon} /></ListItemIcon>
                                <ListItemText primary={top.secondary} />
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
        </Container>
    )
}

export default TopicsPanelSm
