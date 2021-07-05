import React from 'react'
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { ForumStatsPanel, TopicsPanelLg } from '../../Panels';
import * as api from '../../../api'
import { get_latest_topics, get_hot_topics } from '../../../redux/topicsReducer';

const Overview = () => {
    const classes = useStyles();

    return (
        <Container>
            <Typography className={classes.typoH2} variant="h2">Overview</Typography>
            <ForumStatsPanel />
            <TopicsPanelLg header="latest topics" API={api.getLatestTopics} reduxDispatch={get_latest_topics} selectorName="latestTopics" />
            <TopicsPanelLg header="hot topics" API={api.getHotTopics} reduxDispatch={get_hot_topics} selectorName="hotTopics" />
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    typoH2: {
        fontWeight: 700,
        fontSize: "1.2rem",
        marginTop: "40px",
        textTransform: "uppercase",
        color: theme.palette.secondary.dark
    }
}))

export default Overview
