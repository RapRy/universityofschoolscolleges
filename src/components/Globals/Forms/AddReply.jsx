import React, { useState } from 'react'
import { Container, Grid, Avatar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import CommentIcon from '@material-ui/icons/Comment';

import TextArea from './TextArea'
import * as api from '../../../api'
import { update_selected_topic_replies } from '../../../redux/topicsReducer'

const profileLs = JSON.parse(localStorage.getItem('profile'))?.result;

const initialErrors = { reply: "", ref: { category: "", topic: "", creator: "" } };
const initialState = { reply: "", ref: { category: "", topic: "", creator: "" } };

const AddReply = ({ categoryId, topicId }) => {
    const classes = useStyles()

    const [errors, setErrors] = useState(initialErrors)
    const [formData, setFormData] = useState(initialState)

    const { profile } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setFormData({ reply: e.target.value, ref: { category: categoryId, topic: topicId, creator: profile.result?._id || profileLs._id } })
        setErrors(initialErrors)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if(formData.reply === ""){
            setErrors({ ...errors, ['reply']: "Field required." })
            return
        }

        const { data, status } = await api.addReply(formData)

        if(status === 200){
            dispatch(update_selected_topic_replies(data))
        }
    }

    return (
        <Container classes={{ root: classes.containerRoot }}>
            <Grid container direction="row" spacing={1}>
                <Grid item md={1}>
                    <Avatar>{ profile.result?.username.charAt(0) || profileLs.username.charAt(0) }</Avatar>
                </Grid>
                <Grid item md={11}>
                    <form onSubmit={handleFormSubmit}>
                        <TextArea type="text" name="reply" label="" handleInputChange={handleInputChange} errors={errors} rows={2} margin={false} />
                        <Button type="submit" className={classes.buttonSubmit} startIcon={<CommentIcon />}>PUBLISH</Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    containerRoot: {
        background: theme.palette.secondary.light,
        margin: `${theme.spacing(3)}px 0`,
        padding: theme.spacing(2)
    },
    buttonSubmit: {
        borderRadius: "0px",
        margin: "10px auto 0",
        fontSize: ".9rem",
        fontWeight: 300,
        color: theme.palette.secondary.contrastText,
        padding: "7px 15px",
        background: theme.palette.primary.main,
        '&:hover': {
            background: theme.palette.primary.main
        },
        [theme.breakpoints.down('xs')]: {
            margin: "6px auto 0"
        }
    }
}))

export default AddReply
