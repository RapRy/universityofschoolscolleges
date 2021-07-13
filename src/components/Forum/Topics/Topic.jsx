import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory, Link } from 'react-router-dom'
import { Container, Grid, Avatar, Typography, Divider, LinearProgress, Collapse, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useSnackbar } from 'notistack'

import { get_topic_details } from '../../../redux/topicsReducer'
import IconBtn from '../../Globals/IconBtn'
import AddReply from '../../Globals/Forms/AddReply'
import Reply from './Reply'
import * as api from '../../../api'
import AddTopicForm from '../../Globals/Forms/AddTopicForm'
import DeleteDialog from '../../Globals/DeleteDialog'
import { update_active_status } from '../../../redux/topicsReducer'

const Topic = () => {
    const profileLS = JSON.parse(localStorage.getItem('profile')).result

    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const classes = useStyles({ max600 })

    const { params, url } = useRouteMatch()
    const history = useHistory()

    const [edit, setEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [showReplies, setShowReplies] = useState(false)

    const dispatch = useDispatch()
    const { selectedTopic, status } = useSelector(state => state.topics)
    const { profile } = useSelector(state => state.auth)

    const { enqueueSnackbar } = useSnackbar()

    const dateString = () => {
        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const createdAt = new Date(selectedTopic.topic?.createdAt)

        return `${months[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()}`

    }

    const expandReplies = () => setShowReplies(prevState => !prevState)

    const handleDelete = () => setOpenDelete(true)

    const handleCloseDialog = () => setOpenDelete(false)

    const handleConfirmDelete = () => {
        dispatch(update_active_status(selectedTopic.topic._id))
        enqueueSnackbar(`${selectedTopic.topic.title} deleted`, { variant: "success" })
        setOpenDelete(false)
        history.push(`/forum/${selectedTopic.topic.ref.category}`)
    }

    const handleEdit = () => setEdit(true)

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

            { openDelete && <DeleteDialog status={openDelete} message={`Click confirm to delete ${selectedTopic.topic.title}`} handleDelete={handleConfirmDelete} handleCancel={handleCloseDialog} /> }

            { status === "idle" && 
                <Container className={classes.container}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={12} sm={2} md={2}>
                            <Grid container direction="row" spacing={1} alignItems="flex-start">
                                {
                                    !max600 &&
                                        <Grid item xs={'auto'} sm={12}>
                                            <Link to={`/forum/profile/${selectedTopic.creator?._id}`} style={{ textDecoration: "none" }}>
                                                <Avatar className={classes.avatar}>{ selectedTopic.creator?.username?.charAt(0) }</Avatar>
                                            </Link>
                                        </Grid>
                                }
                                <Grid item xs={12}>
                                    {
                                        max600 ?
                                            <div className={classes.titleContainer}>
                                                <Typography variant="h3" className={classes.title}>{ selectedTopic.topic?.title }</Typography>
                                                <Typography variant="body1" className={classes.updatesDetails}>Asked by { <Link to={`/forum/profile/${selectedTopic.creator?._id}`} style={{ textDecoration: "none" }}><span className={classes.span}>{ selectedTopic.creator?.username}</span></Link>} on {dateString()} in { <Link to={`/forum/${selectedTopic.category?._id}`} style={{ textDecoration: "none" }} ><span className={classes.span}>{ selectedTopic.category?.name }</span></Link> }</Typography>
                                                <div className={classes.statContainer}>
                                                    <Typography variant="h2" className={classes.numType}>{ selectedTopic.replies?.length }</Typography>
                                                    <Typography variant="body1" className={classes.stringType}>{selectedTopic.replies?.length > 1 ? "Replies" : "Reply"}</Typography>
                                                </div>
                                                <div className={classes.statContainer}>
                                                    <Typography variant="h2" className={classes.numType}>{ selectedTopic.topic?.meta?.views?.length }</Typography>
                                                    <Typography variant="body1" className={classes.stringType}>{selectedTopic.topic?.meta?.views?.length > 1 ? "Views" : "View"}</Typography>
                                                </div>
                                            </div>
                                        :
                                            <>
                                                <div className={classes.statContainer}>
                                                    <Typography variant="h2" className={classes.numType}>{ selectedTopic.replies?.length }</Typography>
                                                    <Typography variant="body1" className={classes.stringType}>{selectedTopic.replies?.length > 1 ? "Replies" : "Reply"}</Typography>
                                                </div>
                                                <div className={classes.statContainer}>
                                                    <Typography variant="h2" className={classes.numType}>{ selectedTopic.topic?.meta?.views?.length }</Typography>
                                                    <Typography variant="body1" className={classes.stringType}>{selectedTopic.topic?.meta?.views?.length > 1 ? "Views" : "View"}</Typography>
                                                </div>
                                            </>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={10} md={10}>
                            {
                                !max600 &&
                                    <div className={classes.titleContainer}>
                                        <Typography variant="h3" className={classes.title}>{ selectedTopic.topic?.title }</Typography>
                                        <Typography variant="body1" className={classes.updatesDetails}>Asked by { <Link to={`/forum/profile/${selectedTopic.creator?._id}`} style={{ textDecoration: "none" }}><span className={classes.span}>{ selectedTopic.creator?.username}</span></Link>} on {dateString()} in { <Link to={`/forum/${selectedTopic.category?._id}`} style={{ textDecoration: "none" }} ><span className={classes.span}>{ selectedTopic.category?.name }</span></Link> }</Typography>
                                    </div>
                            }

                            {
                                (profileLS._id === selectedTopic.topic?.ref?.creator || profile.result?._id === selectedTopic.topic?.ref?.creator) &&
                                    <div className={classes.ctaContainer}>
                                        <IconBtn icon={<EditIcon />} text="edit" handleClick={handleEdit} />
                                        <IconBtn icon={<DeleteIcon />} text="delete" handleClick={handleDelete} />
                                    </div>
                            }

                            {
                                edit && <AddTopicForm action="edit" />
                            }

                            <Divider className={classes.divider} />

                            <div className={classes.descContainer}>
                                <Typography variant="body1" className={classes.description}>{ selectedTopic.topic?.description }</Typography>
                            </div>

                            <div>
                                <Typography onClick={expandReplies} variant="h5" className={classes.repliesCount}>{ selectedTopic.replies?.length > 1 ? `${selectedTopic.replies?.length} Replies` : `${selectedTopic.replies?.length} Reply`} { showReplies ? <ExpandLessIcon className={classes.arrow} /> : <ExpandMoreIcon className={classes.arrow} /> }</Typography>

                                <Divider />

                                <div>
                                    <Collapse in={showReplies}>
                                        {
                                            selectedTopic.replies &&
                                                selectedTopic.replies.map(reply => <Reply reply={reply} key={reply._id} />)
                                        }
                                    </Collapse>
                                </div>

                                <AddReply categoryId={selectedTopic.topic?.ref?.category} topicId={selectedTopic.topic?._id} />
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
        marginTop: theme.spacing(6),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[7],
        padding: theme.spacing(3)
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        fontSize: "3rem",
        margin: `${theme.spacing(2)}px auto 0px`
    },
    statContainer: {
        marginTop: props => props.max600 ? theme.spacing(1) : theme.spacing(2),
        display: props => props.max600 ? "inline-block" : "block",
        marginRight: props => props.max600 ? theme.spacing(4) : 0
    },
    numType: {
        fontWeight: theme.typography.fontWeightBlack,
        fontSize: props => props.max600 ? "1.4rem" : "2rem",
        color: theme.palette.primary.main,
        textAlign: "center",
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.6rem"
        },
        [theme.breakpoints.down('xs')]:{
            display: "inline-block",
            fontSize: "2rem"
        }
    },
    stringType: {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.secondary.dark,
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: ".9rem",
        [theme.breakpoints.down('sm')]: {
            fontSize: ".8rem",
        },
        [theme.breakpoints.down('xs')]:{
            display: "inline-block",
            fontSize: ".8rem",
            position: "relative",
            bottom: theme.spacing(1) - 4,
            left: theme.spacing(1)
        }
    },
    titleContainer: {
        marginTop: props => props.max600 ? 0 : theme.spacing(2)
    },
    title: {
        fontSize: "1.1rem",
        color: theme.palette.secondary.dark,
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(1)
    },
    updatesDetails: {
        fontSize: ".85rem",
        color: theme.palette.primary.light
    },
    span: {
        color: theme.palette.secondary.dark,
        fontWeight: theme.typography.fontWeightBold
    },
    ctaContainer: {
        marginTop: theme.spacing(3)
    },
    divider: {
        marginTop: props => props.max600 ? theme.spacing(1) : theme.spacing(3)
    },
    descContainer: {
        margin: `${theme.spacing(3)}px 0`
    },
    description: {
        fontSize: ".8rem",
        color: theme.palette.secondary.dark,
        lineHeight: "1.5rem",
        wordWrap: "break-word"
    },
    repliesCount: {
        fontSize: ".85rem",
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(1),
        color: theme.palette.secondary.dark,
        cursor: "pointer"
    },
    arrow: {
        verticalAlign: "middle",
        float: "right"
    }
}))

export default Topic
