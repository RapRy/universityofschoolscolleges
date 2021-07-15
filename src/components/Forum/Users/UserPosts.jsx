import React, { useEffect } from 'react'
import { Container, LinearProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { get_topics_by_user } from '../../../redux/topicsReducer'
import Post from './Post'
import PanelHeader from '../../Globals/PanelHeader';
import Empty from '../../Globals/Empty/Empty'

const UserPosts = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const { topics, status } = useSelector(state => state.topics)

    useEffect(() => {
        let isMounted = true

        if(isMounted) dispatch(get_topics_by_user(userId))

        return () => {
            isMounted = false
        }
    }, [userId])

    return (
        <Container>
            <PanelHeader title="Posts" />

            { status === "loading" && <LinearProgress style={{ margin: "30px 0" }} /> }

            { (status === 'idle' && topics.length === 0) && <Empty message="No post created" /> }

           {
               topics.map(topic => (
                   <Post key={topic._id} post={topic} />
               ))
           }
        </Container>
    )
}

export default UserPosts
