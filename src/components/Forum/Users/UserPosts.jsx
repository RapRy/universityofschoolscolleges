import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { get_topics_by_user } from '../../../redux/topicsReducer'
import Post from './Post'
import PanelHeader from '../../Globals/PanelHeader';

const UserPosts = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const { topics } = useSelector(state => state.topics)

    useEffect(() => {
        dispatch(get_topics_by_user(userId))
    }, [userId])

    return (
        <Container>
            <PanelHeader title="Posts" />
           {
               topics.map(topic => (
                   <Post key={topic._id} post={topic} />
               ))
           }
        </Container>
    )
}

export default UserPosts
