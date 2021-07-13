import React, { useEffect, useState } from 'react'
import { Container, Typography, LinearProgress, Box, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import _ from 'lodash'

import AddTopicForm from '../../Globals/Forms/AddTopicForm'
import IconBtn from '../../Globals/IconBtn'
import PanelHeader from '../../Globals/PanelHeader'
import TopicWithThumbnail from '../../Globals/Topics/TopicWithThumbnail'
import { set_selected } from '../../../redux/categoriesReducer'
import { get_topics, get_latest_topics_view_all, get_hot_topics_view_all, get_related_topics_view_all } from '../../../redux/topicsReducer'
import Empty from '../../Globals/Empty/Empty'

const Topics = () => {
    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const classes = useStyles({ max600 })
    const { category } = useParams()

    const [showForm, setShowForm] = useState(false)
    const [displayCat, setDisplayCat] = useState("")

    const match = useRouteMatch('/forum/:topic');
    const history = useHistory()

    const { selectedCat } = useSelector(state => state.categories)
    const { topics, status, selectedTopic } = useSelector(state => state.topics)
    const { profile } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const userFromLocal = JSON.parse(localStorage.getItem('profile'))

    const toggleShow = () => setShowForm(prevState => !prevState)

    useEffect(() => {
        if(profile.result === null || userFromLocal.result === null || selectedCat.active === 0) history.push('/forum')

        setDisplayCat("")

        switch(category){
            case "latest-topics":
                dispatch(get_latest_topics_view_all(20))
                setDisplayCat(category.replace("-", " "))
                dispatch(set_selected("topics"))
                break
            case "hot-topics":
                dispatch(get_hot_topics_view_all(20))
                setDisplayCat(category.replace("-", " "))
                dispatch(set_selected("topics"))
                break
            case "related-topics":
                
                if(_.isEmpty(selectedTopic.topic)){
                    history.push('/forum/topics')
                    break;
                }

                dispatch(get_related_topics_view_all(selectedTopic.topic?._id))
                setDisplayCat(category.replace("-", " "))
                dispatch(set_selected("topics"))
                break
            case "topics":
                dispatch(get_topics(category))
                dispatch(set_selected(category))
                setDisplayCat('all')
                break
            default:
                dispatch(set_selected(category))
                dispatch(get_topics(category))
                break
        }

        if(profile.result?.accountType === 1 || userFromLocal.result?.accountType === 1) setShowForm(true)
    }, [match.url])

    return (
        <Container className={classes.container}> 
            {
                (profile.result?.accountType === 1 || userFromLocal.result?.accountType === 1) ?
                    <Box>
                        <Typography className={classes.typoH2} variant="h2" display="inline">Topics |</Typography>
                        <Typography className={classes.headerH6} variant="h6" display="inline">{ displayCat !== "" ? displayCat : selectedCat.name }</Typography>
                    </Box>
                :
                    <PanelHeader title={`Topics / ${displayCat !== "" ? displayCat : selectedCat.name }`} />
            }

            { showForm === false &&  
                <Box marginTop="10px">
                    <IconBtn icon={<NoteAddIcon />} text="Add Topic" handleClick={toggleShow} /> 
                </Box>
            }

            {
                showForm === true && <AddTopicForm action="add" />
            }

            <div>
                { status === "loading" && <LinearProgress style={{ margin: "30px 0" }} /> }

                { (status === 'idle' && topics.length === 0) && <Empty message="No Topics" /> }
                {
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
        marginTop: props => props.max600 ? theme.spacing(8) : theme.spacing(4)
    },
    typoH2: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "1.2rem",
        textTransform: "uppercase",
        color: theme.palette.secondary.dark
    },
    headerH6: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "1rem",
        marginLeft: theme.spacing(1),
        textTransform: "uppercase",
        color: theme.palette.secondary.dark
    }
}))

export default Topics
