import React, { useEffect, useState } from 'react'
import { Container, Typography, Divider, Collapse } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useSelector } from 'react-redux'

import * as api from '../../../api'
import IconBtn from '../../Globals/IconBtn';
import Reply from '../Topics/Reply';
import AddReply from '../../Globals/Forms/AddReply';

const Post = ({ post }) => {
    const profileLS = JSON.parse(localStorage.getItem('profile')).result

    const classes = useStyles()
    const [additionalData, setAdditionalData] = useState({})
    const [showReplies, setShowReplies] = useState(false)

    const { profile } = useSelector(state => state.auth)

    const expandReplies = () => setShowReplies(prevState => !prevState)

    useEffect(() => {
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
    }, [post])

    const dateString = () => {
        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const createdAt = new Date(post.createdAt)

        return `${months[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()}`

    }

    return (
        <Container className={classes.container}>
            <div>
                <Typography variant="h3" className={classes.title}>{ post.title }</Typography>
                <Typography variant="body1" className={classes.stats}><InsertCommentIcon className={classes.icon} /> {post.meta.replies.length > 1 ? `${post.meta.replies.length} Replies` : `${post.meta.replies.length} Reply`}</Typography>
                <Typography variant="body1" className={classes.stats}><VisibilityIcon className={classes.icon} /> {post.meta.views.length > 1 ? `${post.meta.views.length} Views` : `${post.meta.views.length} View`}</Typography>
                <Typography variant="body1" className={classes.updatesDetails}>posted on {dateString()} in { <span className={classes.span}>{ additionalData.category?.name }</span> }</Typography>
            </div>
            {
                (profileLS._id === post.ref?.creator || profile.result?._id === post.ref?.creator) &&
                    <div className={classes.ctaContainer}>
                        <IconBtn icon={<EditIcon />} text="edit" />
                        <IconBtn icon={<DeleteIcon />} text="delete" />
                    </div>
            }

            <Divider className={classes.divider} />

            <div className={classes.descContainer}>
                <Typography variant="body1" className={classes.description}>{ post.description }</Typography>
            </div>

            <div>
                <Typography onClick={expandReplies} variant="h5" className={classes.repliesCount}>{ post.meta?.replies?.length > 1 ? `${post.meta?.replies?.length} Replies` : `${post.meta?.replies?.length} Reply`} { showReplies ? <ExpandLessIcon /> : <ExpandMoreIcon /> }</Typography>

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
        marginTop: theme.spacing(2),
        padding: theme.spacing(3)
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
    title: {
        fontSize: "1.1rem",
        color: theme.palette.secondary.dark,
        fontWeight: 700,
        marginBottom: theme.spacing(1)
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

export default Post
