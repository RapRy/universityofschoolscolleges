import React, { useEffect, useState } from 'react'
import { Container, Typography, LinearProgress, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import AddTopicForm from '../../Globals/Forms/AddTopicForm'
import IconBtn from '../../Globals/IconBtn'
import PanelHeader from '../../Globals/PanelHeader'
import TopicWithThumbnail from '../../Globals/Topics/TopicWithThumbnail'
import { set_selected } from '../../../redux/categoriesReducer'
import { get_topics } from '../../../redux/topicsReducer'
import Empty from '../../Globals/Empty/Empty'

const Topics = () => {
    const classes = useStyles()
    const { category } = useParams()

    const [showForm, setShowForm] = useState(false)

    const match = useRouteMatch('/forum/:topic');
    const history = useHistory()

    const { selectedCat } = useSelector(state => state.categories)
    const { topics, status } = useSelector(state => state.topics)
    const { profile } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const userFromLocal = JSON.parse(localStorage.getItem('profile'))

    const toggleShow = () => setShowForm(prevState => !prevState)

    useEffect(() => {
        if(profile.result === null || userFromLocal.result === null) history.push('/forum')

        dispatch(set_selected(category))
        dispatch(get_topics(category))

        if(profile.result?.accountType === 1 || userFromLocal.result?.accountType === 1) setShowForm(true)
    }, [match.url])

    return (
        <Container className={classes.container}> 
            {
                (profile.result?.accountType === 1 || userFromLocal.result?.accountType === 1) ?
                    <Box>
                        <Typography className={classes.typoH2} variant="h2" display="inline">Topics |</Typography>
                        <Typography className={classes.headerH6} variant="h6" display="inline">{ category === 'topics' ? "All" : selectedCat.name }</Typography>
                    </Box>
                :
                    <PanelHeader title={`Topics / ${selectedCat.name === "" ? "All" : selectedCat.name }`} />
            }

            { showForm === false &&  
                <Box marginTop="10px" marginLeft="-10px">
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
        marginTop: "40px"
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

export default Topics
