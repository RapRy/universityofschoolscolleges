import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import TodayIcon from '@material-ui/icons/Today'
import CommentIcon from '@material-ui/icons/Comment'
import { useRouteMatch } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import { TopicsPanelSm } from '../Panels'
import * as api from '../../api'
import { get_latest_topics, get_hot_topics, get_related_topics } from '../../redux/topicsReducer' 

const BottomPanels = ({ gridSize }) => {
    const { profile } = useSelector(state => state.auth);

    const classes = useStyles() 

    const match = useRouteMatch('/forum/:category/:topicId')
    const matchSearch = useRouteMatch('/forum/search/:keyword')

    return (
        <Container className={classes.container}>
            <Grid container direction="row" spacing={4}>
                { 
                    (matchSearch === null && match !== null && profile.result?.accountType === 0) && 
                        <Grid item xs={12} sm={gridSize}>
                            <TopicsPanelSm header="related topics" API={api.getRelatedTopics} reduxDispatch={get_related_topics} selectorName="relatedTopics" 
                                icon={<TodayIcon 
                                    classes={{ root: classes.svg }} 
                                />} 
                                limitOrId={match?.params?.topicId}
                            /> 
                        </Grid>
                }
                { 
                    profile.result?.accountType === 0 && 
                        <Grid item xs={12} sm={gridSize}>
                            <TopicsPanelSm header="latest topics" API={api.getLatestTopics} reduxDispatch={get_latest_topics} selectorName="latestTopics" 
                                icon={<TodayIcon 
                                    classes={{ root: classes.svg }} 
                                />} 
                                limitOrId={8}
                            /> 
                        </Grid>
                }
                { 
                    profile.result?.accountType === 0 && 
                        <Grid item xs={12} sm={gridSize}>
                            <TopicsPanelSm header="hot topics" API={api.getHotTopics} reduxDispatch={get_hot_topics} selectorName="hotTopics" 
                                icon={<CommentIcon 
                                    classes={{ root: classes.svg }} 
                                />} 
                                limitOrId={8}
                            /> 
                        </Grid>
                }
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10)
    },
    svg: {
        color: theme.palette.primary.light,
        fontSize: '.95rem',
        verticalAlign: "middle",

    }
}))

export default BottomPanels
