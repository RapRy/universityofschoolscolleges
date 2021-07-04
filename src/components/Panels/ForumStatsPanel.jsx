import React, { useEffect } from 'react'
import { Container, Grid, Divider, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import PanelHeader from '../Globals/PanelHeader'
import { UserStatData, AdminStatData } from './Stats'
import * as api from '../../api'
import { update_count } from '../../redux/statsReducer'

const ForumStatsPanel = () => {
    const classes = useStyles()
    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))

    const { profile } = useSelector(state => state.auth)
    const { categories } = useSelector(state => state.categories)
    const { topics, selectedTopic } = useSelector(state => state.topics)
    const { activeUsersCount, categoriesCount, registeredUsersCount, topicsCount, repliesCount } = useSelector(state => state.stats)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const result = await Promise.all([
                    api.getActiveUsersCount(),
                    api.getRegisteredCount(),
                    api.getCategoriesCount(),
                    api.getTopicCount(),
                    api.repliesCount()
                ])

                if(result[0].status === 200 && result[1].status === 200 && result[2].status === 200 && result[3].status === 200 && result[4].status === 200){
                    dispatch(update_count({ ...result[0].data, ...result[1].data, ...result[2].data, ...result[3].data, ...result[4].data }))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchCount()
    }, [dispatch, categories, topics, selectedTopic.replies])

    return (
        <Container style={{ padding: "0"}}>
            <PanelHeader title="forum statistics" />
            {
                profile.result?.accountType === 1 ?
                    <Grid container justify="space-evenly" direction={max600 === true ? "column" : "row"} className={classes.grid}>
                        <AdminStatData numData={activeUsersCount} stringData="Active Members" />
                        <Divider orientation={max600 === true ? "horizontal" : "vertical"} flexItem={!max600} />
                        <AdminStatData numData={registeredUsersCount} stringData="Registered Members" />
                        <Divider orientation={max600 === true ? "horizontal" : "vertical"} flexItem={!max600} />
                        <AdminStatData numData={categoriesCount} stringData="Categories" />
                        <Divider orientation={max600 === true ? "horizontal" : "vertical"} flexItem={!max600} />
                        <AdminStatData numData={topicsCount} stringData="Topics" />
                        <Divider orientation={max600 === true ? "horizontal" : "vertical"} flexItem={!max600} />
                        <AdminStatData numData={repliesCount} stringData="Replies" />
                    </Grid>
                :
                    <Grid container direction="column" className={classes.grid}>
                        <UserStatData numData={activeUsersCount} stringData="Members" />
                        <Divider />
                        <UserStatData numData={categoriesCount} stringData="Categories"  />
                        <Divider />
                        <UserStatData numData={topicsCount} stringData="Topics"  />
                        <Divider />
                        <UserStatData numData={repliesCount} stringData="Replies"  />
                    </Grid>
            }
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    grid: {
        background: theme.palette.secondary.light,
        marginTop: "15px",
        padding: "10px 20px"
    }
}))

export default ForumStatsPanel
