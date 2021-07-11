import React, { useEffect } from 'react'
import { Container, Grid, useMediaQuery } from '@material-ui/core'
import { useSelector } from 'react-redux'
import TodayIcon from '@material-ui/icons/Today'
import CommentIcon from '@material-ui/icons/Comment'
import { makeStyles } from '@material-ui/styles'
import { useRouteMatch } from 'react-router-dom'

import { ManagePanel, ForumStatsPanel, CategoriesPanel, TopicsPanelSm } from '../Panels'
import PanelButton from '../Globals/PanelButton'
import * as api from '../../api'
import { get_latest_topics, get_hot_topics, get_related_topics } from '../../redux/topicsReducer' 
import UserProfile from '../Forum/Users/UserProfile'

const manageArr = [
    {header: "manage users", options: [
        {_id: "active-users", name:"active users"},
        {_id: "registered-users", name:"registered users"},
        {_id: "blacklisted-users", name:"blacklisted users"}
    ]},
    {header: "manage forum", options: [
        {_id: "categories", name:"categories"},
        {_id: "topics", name:"topics"}
    ]}
]

const SideNavigation = () => {
    const { profile } = useSelector(state => state.auth);

    const match = useRouteMatch('/forum/:category/:topicId')
    const matchProfile = useRouteMatch('/forum/profile/:userId')
    const matchSearch = useRouteMatch('/forum/search/:keyword')

    const classes = useStyles() 

    const max960 = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))

    if(matchProfile !== null){
        return(
            <Container>
                <UserProfile />
            </Container>
        )
    }

    if(profile.result?.accountType === 1){
        return(
            <Container style={{ marginTop: "30px" }}>
                <PanelButton opt={{ name: "overview", _id: "" }} />
                <Grid container direction={(max960 === false || max600 === true) ? "column" : "row"} spacing={2}>
                    {
                        manageArr.map((manage, i) => <ManagePanel key={i} manage={manage} />)
                    }
                </Grid>
            </Container>
        )
    }

    return (
        <Container>
            <ForumStatsPanel />
            <CategoriesPanel />
            { (matchSearch === null && match !== null) && <TopicsPanelSm header="related topics" API={api.getRelatedTopics} reduxDispatch={get_related_topics} selectorName="relatedTopics" icon={<TodayIcon classes={{ root: classes.svg }} />} /> }
            { profile.result?.accountType === 0 && <TopicsPanelSm header="latest topics" API={api.getLatestTopics} reduxDispatch={get_latest_topics} selectorName="latestTopics" icon={<TodayIcon classes={{ root: classes.svg }} />} /> }
            { profile.result?.accountType === 0 && <TopicsPanelSm header="hot topics" API={api.getHotTopics} reduxDispatch={get_hot_topics} selectorName="hotTopics" icon={<CommentIcon classes={{ root: classes.svg }} />} /> }
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    svg: {
        color: theme.palette.primary.light,
        fontSize: '.95rem',
        verticalAlign: "middle",

    }
}))

export default SideNavigation
