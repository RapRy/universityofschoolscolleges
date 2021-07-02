import React, { useEffect } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Container, Grid, Avatar, Typography, Divider, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { get_topic_details } from '../../../redux/topicsReducer'
import IconBtn from '../../Globals/IconBtn'
import AddReply from '../../Globals/Forms/AddReply'
import Reply from './Reply'
import * as api from '../../../api'

const Topic = () => {
    const profileLS = JSON.parse(localStorage.getItem('profile')).result
    const classes = useStyles()

    const { params, url } = useRouteMatch()
    const history = useHistory()

    const dispatch = useDispatch()
    const { selectedTopic, status } = useSelector(state => state.topics)
    const { profile } = useSelector(state => state.auth)

    const dateString = () => {
        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const createdAt = new Date(selectedTopic.topic?.createdAt)

        return `${months[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()}`

    }

    const handleDelete = () => {
        console.log('delete')
    }

    const handleEdit = () => {
        console.log('edit')
    }

    useEffect(() => {
        if(profile.result === null || profileLS === null) history.push('/forum')

        dispatch(get_topic_details(params.topicId))    

        try {
            const data = { topicId: params.topicId, viewer: profile.result?._id || profileLS._id }
            api.addTopicViews(data)
        } catch (error) {
            console.log(error)
        } 
    }, [url])
    
    return (
        <Container>
            { status === "loading" && <LinearProgress style={{ margin: "30px 0" }} /> }

            { status === "idle" && 
                <Container className={classes.container}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item md={2}>
                            <Avatar className={classes.avatar}>{ selectedTopic.creator?.username?.charAt(0) }</Avatar>
                            <div className={classes.statContainer}>
                                <Typography variant="h2" className={classes.numType}>{ selectedTopic.replies?.length }</Typography>
                                <Typography variant="body1" className={classes.stringType}>{selectedTopic.replies?.length > 1 ? "Replies" : "Reply"}</Typography>
                            </div>
                            <div className={classes.statContainer}>
                                <Typography variant="h2" className={classes.numType}>{ selectedTopic.topic?.meta?.views?.length }</Typography>
                                <Typography variant="body1" className={classes.stringType}>{selectedTopic.topic?.meta?.views?.length > 1 ? "Views" : "View"}</Typography>
                            </div>
                        </Grid>

                        <Grid item md={10}>
                            <div className={classes.titleContainer}>
                                <Typography variant="h3" className={classes.title}>{ selectedTopic.topic?.title }</Typography>
                                <Typography variant="body1" className={classes.updatesDetails}>Asked by { <span className={classes.span}>{ selectedTopic.creator?.username}</span>} on {dateString()} in { <span className={classes.span}>{ selectedTopic.category?.name }</span> }</Typography>
                            </div>

                            {
                                (profileLS._id === selectedTopic.topic?.ref?.creator || profile.result?._id === selectedTopic.topic?.ref?.creator) &&
                                    <div className={classes.ctaContainer}>
                                        <IconBtn icon={<EditIcon />} text="edit" handleClick={handleEdit} />
                                        <IconBtn icon={<DeleteIcon />} text="delete" handleClick={handleDelete} />
                                    </div>
                            }

                            <Divider className={classes.divider} />

                            <div className={classes.descContainer}>
                                <Typography variant="body1" className={classes.description}>{ selectedTopic.topic?.description }</Typography>
                            </div>

                            <div>
                                <Typography variant="h5" className={classes.repliesCount}>{ selectedTopic.replies?.length > 1 ? `${selectedTopic.replies?.length} Replies` : `${selectedTopic.replies?.length} Reply`} </Typography>

                                <Divider />

                                <AddReply categoryId={selectedTopic.topic?.ref?.category} topicId={selectedTopic.topic?._id} />

                                <div>
                                    {
                                        selectedTopic.replies &&
                                            selectedTopic.replies.map(reply => <Reply reply={reply} key={reply._id} />)
                                    }
                                </div>
                            </div>
                        </Grid>
                    </Grid> 
                </Container>
            }
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.primary.contrastText,
        marginTop: theme.spacing(6)
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        fontSize: "3rem",
        margin: `${theme.spacing(2)}px auto 0px`
    },
    statContainer: {
        marginTop: theme.spacing(2)
    },
    numType: {
        fontWeight: 900,
        fontSize: "2rem",
        color: theme.palette.primary.dark,
        textAlign: "center",
        marginBottom: "5px",
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.6rem",
            marginBottom: "5px",
        },
        [theme.breakpoints.down('xs')]:{
            display: "inline-block",
            fontSize: "2rem"
        }
    },
    stringType: {
        fontWeight: 500,
        color: theme.palette.secondary.dark,
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: ".9rem",
        [theme.breakpoints.down('sm')]: {
            fontSize: ".8rem",
        },
        [theme.breakpoints.down('xs')]:{
            display: "inline-block",
            fontSize: ".9rem",
            position: "relative",
            bottom: "6px",
            left: "10px"
        }
    },
    titleContainer: {
        marginTop: theme.spacing(2)
    },
    title: {
        fontSize: "1.1rem",
        color: theme.palette.secondary.dark,
        fontWeight: 700,
        marginBottom: theme.spacing(1)
    },
    updatesDetails: {
        fontSize: ".85rem",
        color: theme.palette.secondary.main
    },
    span: {
        color: theme.palette.secondary.dark,
        fontWeight: 700
    },
    ctaContainer: {
        marginTop: theme.spacing(3)
    },
    divider: {
        marginTop: theme.spacing(3)
    },
    descContainer: {
        margin: `${theme.spacing(3)}px 0`
    },
    description: {
        fontSize: ".8rem",
        color: theme.palette.secondary.main,
        lineHeight: "1.5rem"
    },
    repliesCount: {
        fontSize: ".85rem",
        fontWeight: 700,
        marginBottom: theme.spacing(1),
        color: theme.palette.secondary.dark
    }
}))

export default Topic
