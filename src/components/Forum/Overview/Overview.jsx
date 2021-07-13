import React from 'react'
import { Typography, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { ForumStatsPanel, TopicsPanelLg, UsersPanelLg } from '../../Panels';
import * as api from '../../../api'
import { get_latest_topics, get_hot_topics } from '../../../redux/topicsReducer';
import { new_users_panel, active_users_panel } from '../../../redux/usersReducer';

const Overview = () => {
    const classes = useStyles();

    return (
        <Container>
            <Typography className={classes.typoH2} variant="h2">Overview</Typography>
            <ForumStatsPanel />
            <Grid container direction="row" spacing={5}>
                <Grid item sm={6} xs={12}>
                    <UsersPanelLg header="new users" API={api.getNewUsers} reduxDispatch={new_users_panel} selectorName="newUsers" />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <UsersPanelLg header="active users" API={api.getActiveUsers} reduxDispatch={active_users_panel} selectorName="activeUsers" />
                </Grid>
            </Grid>
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
