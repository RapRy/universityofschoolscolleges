import React from 'react'
import { Container, Grid, useMediaQuery } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { ManagePanel, ForumStatsPanel, CategoriesPanel, TopicsPanelSm } from '../Panels'
import PanelButton from '../Globals/PanelButton'

const manageArr = [
    {header: "manage users", options: [
        {_id: "active", name:"active users"},
        {_id: "registered", name:"registered users"},
        {_id: "blacklisted", name:"blacklisted users"}
    ]},
    {header: "manage forum", options: [
        {_id: "categories", name:"categories"},
        {_id: "topics", name:"topics"}
    ]}
]

const SideNavigation = () => {
    const { profile } = useSelector(state => state.auth);

    const max960 = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))

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
            <TopicsPanelSm header="latest topics" request="latest" />
            <TopicsPanelSm header="hot topics" request="hot" />
        </Container>
    )
}

export default SideNavigation
