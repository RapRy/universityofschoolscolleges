import React, { useEffect, useState } from 'react'
import { Container, Typography, Divider, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import * as api from '../../../api'

const TopicWithoutThumbnail = ({ topic, selectorName }) => {
    const classes = useStyles()

    const [additionalData, setAdditionalData] = useState({})

    useEffect(() => {
        const fetchAdditionals = async () => {
            try {
                const result = await Promise.all([
                    api.getUser(topic.ref.creator),
                    api.getCategory(topic.ref.category)
                ])

                if(result[0].status === 200 && result[1].status === 200){
                    setAdditionalData({ user: result[0].data, category: result[1].data.category })
                }
                
            } catch (error) {
                console.log(error)
            }
        }

        fetchAdditionals()

        return () => {
            setAdditionalData({})
        }
    }, [topic])

    const dateString = () => {
        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const updatedAt = new Date(topic.updatedAt)
        const createdAt = new Date(topic.createdAt)

        if(selectorName === "hotTopics"){
            if(Date.parse(topic.createdAt) < Date.parse(topic.updatedAt)) return `updated on ${months[updatedAt.getMonth()]} ${updatedAt.getDate()}, ${updatedAt.getFullYear()}` 
            
            return `added on ${months[updatedAt.getMonth()]} ${updatedAt.getDate()}, ${updatedAt.getFullYear()}`
        }

        return `added on ${months[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()}`

    }

    return (
        <Container className={classes.container}>
            <Link to={`/forum/${additionalData.category?.name.replace(" ", "-")}/${topic._id}`} style={{ textDecoration: "none", overflow: 'hidden' }}>
                <Typography variant="h4" className={classes.title}>{ topic.title }</Typography>
            </Link>
            <Box marginBottom="5px">
                <Typography variant="body1" className={classes.stats}><InsertCommentIcon className={classes.icon} /> {topic.meta.replies.length > 1 ? `${topic.meta.replies.length} Replies` : `${topic.meta.replies.length} Reply`}</Typography>
                <Typography variant="body1" className={classes.stats}><VisibilityIcon className={classes.icon} /> {topic.meta.views.length > 1 ? `${topic.meta.views.length} Views` : `${topic.meta.views.length} View`}</Typography>
                <Typography variant="body1" className={classes.stats}><AccountCircleIcon className={classes.icon} /> {additionalData.user?.username}</Typography>
            </Box>
            <Typography variant="body1" className={classes.updatesDetails}>
                { dateString() } in { <span className={classes.span}>{ additionalData.category?.name }</span> }
            </Typography>
            <Divider className={classes.divider} /> 
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(1),
        overflow: "hidden"
    },
    divider: {
        marginTop: theme.spacing(2)
    },
    title: {
        fontWeight: 700,
        fontSize: "1rem",
        color: theme.palette.secondary.dark,
        marginBottom: "5px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    },
    stats: {
        display: "inline-block",
        fontSize: ".85rem",
        fontWeight: 500,
        marginRight: "10px",
        color: theme.palette.secondary.dark
    },
    icon: {
        verticalAlign: "middle",
        fontSize: ".95rem",
        color: theme.palette.secondary.dark
    },
    updatesDetails: {
        fontSize: ".85rem",
        color: theme.palette.secondary.main
    },
    span: {
        color: theme.palette.secondary.dark,
        fontWeight: 700
    }
}))

export default TopicWithoutThumbnail
