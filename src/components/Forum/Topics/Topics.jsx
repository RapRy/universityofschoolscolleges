import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import AddTopicForm from '../../Globals/Forms/AddTopicForm'
import { set_selected } from '../../../redux/categoriesReducer'

const Topics = () => {
    const classes = useStyles()
    const { topic } = useParams()

    const match = useRouteMatch('/forum/:topic');

    const { selectedCat } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(set_selected(topic))
    }, [match.url])

    return (
        <Container className={classes.container}> 
            <Typography className={classes.typoH2} variant="h2" display="inline">Topics |</Typography>
            <Typography className={classes.headerH6} variant="h6" display="inline">{ topic === 'topics' ? "All" : selectedCat.name }</Typography>
            <AddTopicForm />
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
