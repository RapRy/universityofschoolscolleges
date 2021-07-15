import React, { useEffect, useState } from 'react'
import { Container, Typography, Divider, Collapse } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack'

import * as api from '../../../api'
import IconBtn from '../../Globals/IconBtn';
import Reply from '../Topics/Reply';
import AddReply from '../../Globals/Forms/AddReply';
import AddTopicForm from '../../Globals/Forms/AddTopicForm';
import DeleteDialog from '../../Globals/DeleteDialog';
import { update_active_status, get_topic_details } from '../../../redux/topicsReducer';
import { set_selected } from '../../../redux/categoriesReducer';

const Post = ({ post }) => {
    const profileLS = JSON.parse(localStorage.getItem('profile')).result

    const { enqueueSnackbar } = useSnackbar()

    const dispatch = useDispatch()

    const history = useHistory()

    const classes = useStyles()
    const [additionalData, setAdditionalData] = useState({})
    const [showReplies, setShowReplies] = useState(false)
    const [edit, setEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const { profile } = useSelector(state => state.auth)

    const expandReplies = () => setShowReplies(prevState => !prevState)

    const handleEdit = async () => {
        await dispatch(get_topic_details(post._id))
        await dispatch(set_selected(post.ref.category))
        await setEdit(true)
    }

    const handleDelete = () => setOpenDelete(true)

    const handleCloseDialog = () => setOpenDelete(false)

    const handleConfirmDelete = () => {
        dispatch(update_active_status(post._id))
        enqueueSnackbar(`${post.title} deleted`, { variant: "success" })
        setOpenDelete(false)
        history.push(`/forum/profile/${profile.result._id}`)
    }

    useEffect(() => {
        let isMounted = true

        if(isMounted){
            const fetchAdditionals = async () => {
                try {
                    const result = await Promise.all([
                        api.getCategory(post.ref.category),
                        api.getReplies(post._id)
                    ])
    
                    if(result[0].status === 200 || result[1].status === 200){
                        setAdditionalData({ ...result[0].data, replies: result[1].data })
                    }
                } catch (error) {
                    console.log(error)
                }
            }
    
            fetchAdditionals()
        }

        return () => {
            setAdditionalData({})
            isMounted = false
        }
    }, [post])

    const dateString = () => {
        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const createdAt = new Date(post.createdAt)

        return `${months[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()}`

    }

    return (
        <Container className={classes.container}>

            { openDelete && <DeleteDialog status={openDelete} message={`Click confirm to delete ${post.title}`} handleDelete={handleConfirmDelete} handleCancel={handleCloseDialog} /> }

            <div>
                <Link to={`/forum/${additionalData.category?.name.replace(" ", "-")}/${post._id}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h3" className={classes.title}>{ post.title }</Typography>
                </Link>
                <Typography variant="body1" className={classes.stats}><InsertCommentIcon className={classes.icon} /> {post.meta.replies.length > 1 ? `${post.meta.replies.length} Replies` : `${post.meta.replies.length} Reply`}</Typography>
                <Typography variant="body1" className={classes.stats}><VisibilityIcon className={classes.icon} /> {post.meta.views.length > 1 ? `${post.meta.views.length} Views` : `${post.meta.views.length} View`}</Typography>
                <Typography variant="body1" className={classes.updatesDetails}>posted on {dateString()} in { <Link to={`/forum/${additionalData.category?._id}`} style={{ textDecoration: "none" }}><span className={classes.span}>{ additionalData.category?.name }</span></Link> }</Typography>
            </div>
            {
                (profileLS._id === post.ref?.creator || profile.result?._id === post.ref?.creator) &&
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
                <Typography variant="body1" className={classes.description}>{ post.description }</Typography>
            </div>

            <div>
                <Typography onClick={expandReplies} variant="h5" className={classes.repliesCount}>{ post.meta?.replies?.length > 1 ? `${post.meta?.replies?.length} Replies` : `${post.meta?.replies?.length} Reply`} { showReplies ? <ExpandLessIcon className={classes.arrow} /> : <ExpandMoreIcon className={classes.arrow} /> }</Typography>

                <Divider />

                <div>
                    <Collapse in={showReplies}>
                        {
                            additionalData.replies?.map(reply => <Reply reply={reply} key={reply._id} />)
                        }
                    </Collapse>
                </div>

                <AddReply categoryId={post.ref?.category} topicId={post._id} />
            </div>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.primary.contrastText,
        marginTop: theme.spacing(3),
        padding: theme.spacing(3),
        boxShadow: theme.shadows[7],
        borderRadius: theme.shape.borderRadius
    },
    title: {
        fontSize: "1.1rem",
        color: theme.palette.secondary.dark,
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(1)
    },
    stats: {
        display: "inline-block",
        fontSize: ".85rem",
        fontWeight: 500,
        marginRight: theme.spacing(1),
        color: theme.palette.secondary.dark
    },
    icon: {
        verticalAlign: "middle",
        fontSize: ".95rem",
        color: theme.palette.secondary.dark
    },
    updatesDetails: {
        fontSize: ".85rem",
        color: theme.palette.primary.light,
        marginTop: theme.spacing(1)
    },
    span: {
        color: theme.palette.secondary.dark,
        fontWeight: theme.typography.fontWeightBold
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
        color: theme.palette.primary.light,
        lineHeight: "1.5rem",
        wordWrap: "break-word"
    },
    repliesCount: {
        fontSize: ".85rem",
        fontWeight: 700,
        marginBottom: theme.spacing(1),
        color: theme.palette.secondary.dark,
        cursor: "pointer"
    },
    arrow: {
        verticalAlign: "middle",
        float: "right"
    }
}))

export default Post
