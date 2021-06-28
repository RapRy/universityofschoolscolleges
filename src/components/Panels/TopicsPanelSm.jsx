import React from 'react'
import { Container, List, ListItem, ListItemText, SvgIcon, ListItemIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
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
    const classes = useStyles()

    return (
        <Container style={{ padding: "0" }}>
            <PanelHeader title={header} />
            <List>
                {
                    topics[request].map((top, i) => (
                        <ListItem key={i}>
                            <Link to={`forum`} style={{ textDecoration: "none", overflowX: "hidden" }}>
                                <ListItemText primary={top.primary} classes={{ primary: classes.topicName }} />
                                <ListItemIcon><SvgIcon component={top.icon} classes={{ root: classes.svg }} /></ListItemIcon>
                                <ListItemText primary={top.secondary} classes={{ root: classes.secondaryItem, primary: classes.secondaryTextItem }} />
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
    svg: {
        color: theme.palette.secondary.main,
        fontSize: '1rem',
        verticalAlign: "middle"
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
