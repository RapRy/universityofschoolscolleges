import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListItemText, ListItemIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import * as api from '../../../api'

const TopicInSideNav = ({ top, icon, header }) => {
    const classes = useStyles()

    const [category, setCategory] = useState({})

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

    const dateString = (date) => {
        const createdDate = new Date(date)

        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return `added on ${months[createdDate.getMonth()]} ${createdDate.getDate()}, ${createdDate.getFullYear()}`
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data, status } = await api.getCategory(top.ref.category)

                if(status === 200) setCategory(data.category)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategory()
    }, [top])

    return (
        <Link to={`/forum/${category?.name?.replace(" ", "-")}/${top._id}`} style={{ textDecoration: "none", overflowX: "hidden" }}>
            <ListItemText primary={top.title} classes={{ primary: classes.topicName }} />
            <ListItemIcon classes={{ root: classes.listIcon }}>{icon}</ListItemIcon>
            <ListItemText primary={secondText(header, top.createdAt, top.meta.replies, top.createdAt)} classes={{ root: classes.secondaryItem, primary: classes.secondaryTextItem }} />
        </Link>
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

export default TopicInSideNav
