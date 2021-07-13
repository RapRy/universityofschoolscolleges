import React, { useEffect } from 'react'
import { Container, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useRouteMatch } from 'react-router'

import PanelHeader from '../../Globals/PanelHeader'
import TopicWithThumbnail from '../../Globals/Topics/TopicWithThumbnail'
import Empty from '../../Globals/Empty/Empty'
import { search_topics } from '../../../redux/topicsReducer'

const SearchResult = () => {
    const classes = useStyles()
    const { topics, status } = useSelector(state => state.topics)
    const dispatch = useDispatch()

    const { keyword } = useParams()
    const match = useRouteMatch()

    useEffect(() => {
        dispatch(search_topics(keyword.replace("-", " ")))
    }, [match.url])

    return (
        <Container className={classes.container}>
            <PanelHeader title="Search Result" />

            <div>
                { status === "loading" && <LinearProgress style={{ margin: "30px 0" }} /> }
                { (status === 'idle' && topics.length === 0) && <Empty message={`No results for ${keyword.replace("-", " ")}`} /> }
                {
                    topics &&
                        topics.map((topic) => (
                            <TopicWithThumbnail topic={topic} key={topic._id} />
                        ))
                }
            </div>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(4)
    },
    typoH2: {
        fontWeight: 700,
        fontSize: "1.2rem",
        textTransform: "uppercase",
        color: theme.palette.secondary.dark
    },
    headerH6: {
        fontWeight: 700,
        fontSize: "1rem",
        marginLeft: "5px",
        textTransform: "uppercase",
        color: theme.palette.secondary.dark
    }
}))

export default SearchResult
