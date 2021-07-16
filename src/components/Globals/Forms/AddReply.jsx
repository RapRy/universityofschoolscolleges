import React, { useState } from 'react'
import { Container, Grid, Avatar, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import SendIcon from '@material-ui/icons/Send';

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
            setErrors({ ...errors, 'reply': "Field required." })
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
                <Grid item xs={'auto'} md={1}>
                    <Avatar>{ profile.result?.username?.charAt(0) || profileLs?.username?.charAt(0) }</Avatar>
                </Grid>
                <Grid item xs={9} sm={11} style={{ marginTop: "3px" }}>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container direction="row" spacing={1} justify="flex-end">
                            <Grid item xs={11}>
                                <TextArea type="text" name="reply" label="" handleInputChange={handleInputChange} errors={errors} rows={1} margin={false} />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton type="submit" className={classes.iconBtn}>
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    containerRoot: {
        background: theme.palette.secondary.light,
        margin: `${theme.spacing(3)}px 0 0`,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius
    },
    iconBtn: {
        padding: theme.spacing(1) - 4,
        color: theme.palette.secondary.main
    }
}))

export default AddReply
