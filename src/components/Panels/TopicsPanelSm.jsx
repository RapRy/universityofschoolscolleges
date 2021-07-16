import React, { useEffect } from 'react'
import { Container, List, ListItem } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import PanelHeader from '../Globals/PanelHeader'
import TopicInSideNav from '../Globals/Topics/TopicInSideNav'

const TopicsPanelSm = ({ header, API, reduxDispatch, selectorName, icon, limitOrId }) => {

    const dispatch = useDispatch()
    const topics = useSelector(state => state.topics)


    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const { data, status } = await API(limitOrId);

                if(status === 200){
                    dispatch(reduxDispatch(data))
                }   
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchTopics()
    }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container style={{ padding: "0" }}>
            <Link to={`/forum/${header.replace(" ", "-")}`} style={{ textDecoration: "none" }}>
                <PanelHeader title={header} />
            </Link>
            <List>
                {
                    topics[selectorName].map((top) => (
                        <ListItem key={top._id}>
                            <TopicInSideNav top={top} icon={icon} header={header} />
                        </ListItem>
                    ))
                }
            </List>
        </Container>
    )
}

export default TopicsPanelSm
