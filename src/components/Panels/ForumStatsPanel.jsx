import React, { useEffect } from 'react'
import { Container, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import PanelHeader from '../Globals/PanelHeader'
import { UserStatData, AdminStatData } from './Stats'
import * as api from '../../api'
import { update_count } from '../../redux/statsReducer'

const ForumStatsPanel = () => {
    const classes = useStyles()

    const { profile } = useSelector(state => state.auth)
    const { activeUsersCount, categoriesCount, registeredUsersCount, topicsCount, repliesCount } = useSelector(state => state.stats)

    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const fetchCount = async (API) => {
                try {
                    const { data, status } = await API()
                    if(status === 200) return data
                } catch (error) {
                    console.log(error)
                }
            }

            const fetchStats = async () => {
                const activeUsersCount = await fetchCount(api.getActiveUsersCount)
                const registeredUsersCount = await fetchCount(api.getRegisteredCount)
                const categoriesCount = await fetchCount(api.getCategoriesCount)

                dispatch(update_count({ ...activeUsersCount, ...categoriesCount, ...registeredUsersCount }))
            }

            fetchStats()
        } catch (error) {
            console.log(error)
        }
    }, [dispatch])

    return (
        <Container style={{ padding: "0"}}>
            <PanelHeader title="forum statistics" />
            {
                profile.result?.accountType === 1 ?
                    <Grid container justify="space-evenly" direction="row" className={classes.grid}>
                        <AdminStatData numData={activeUsersCount} stringData="Active Members" />
                        <Divider orientation="vertical" flexItem />
                        <AdminStatData numData={registeredUsersCount} stringData="Registered Members" />
                        <Divider orientation="vertical" flexItem />
                        <AdminStatData numData={categoriesCount} stringData="Categories" />
                        <Divider orientation="vertical" flexItem />
                        <AdminStatData numData={topicsCount} stringData="Topics" />
                        <Divider orientation="vertical" flexItem />
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

const useStyles = makeStyles({
    grid: {
        background: "#e0e0e0",
        marginTop: "15px",
        padding: "10px 20px"
    }
})

export default ForumStatsPanel
