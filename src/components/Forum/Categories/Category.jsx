import React, { useState, useEffect } from 'react'
import { Container, Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

import CategoryHeader from './CategoryHeader';
import AddTopicForm from '../../Globals/Forms/AddTopicForm';
import TopicThumb from './TopicThumb'
import * as api from '../../../api'

const Category = ({ cat }) => {
    const classes = useStyles()

    const [showForm, setShowForm] = useState(false)
    const [topics, setTopics] = useState({
        latestTopics: [],
        hotTopics: [],
        category: {}
    })

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const result = await Promise.all([
                    api.getLatestTopicsByCategory(cat._id),
                    api.getHotTopicsByCategory(cat._id)
                ])

                if(result[0].status === 200 && result[1].status === 200){
                    setTopics({
                        latestTopics: result[0].data.topics,
                        hotTopics: result[1].data.hotTopics,
                        category: result[0].data.category || result[1].data.category
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchAll()
    }, [cat])

    return (
        <Container className={classes.container}>
            <CategoryHeader cat={cat} setShowForm={setShowForm} showForm={showForm} />
            <Divider />
            {
                showForm &&
                    <>
                        <AddTopicForm />
                        <Divider style={{ marginTop: "25px" }} />
                    </>
            }
            <Grid container direction="row" spacing={3} className={classes.gridContainer}>
                {
                    topics.latestTopics.length > 0 &&
                        <Grid item md={6} xs={12}>
                            <Typography variant="h6" className={classes.typoH6}>Latest Topics</Typography>
                            {
                                topics.latestTopics.map(top => <TopicThumb top={top} key={top._id} category={topics.category} />)
                            }
                        </Grid>
                }

                {
                    topics.hotTopics.length > 0 &&
                        <Grid item md={6} xs={12}>
                            <Typography variant="h6" className={classes.typoH6}>Hot Topics</Typography>
                            {
                                topics.hotTopics.map(top => <TopicThumb top={top} key={top._id} category={topics.category} />)
                            }
                        </Grid>
                }
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.primary.contrastText,
        marginTop: theme.spacing(4),
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[7]
    },
    gridContainer: {
        marginTop: theme.spacing(2)
    },
    typoH6: {
        color: theme.palette.secondary.dark,
        fontSize: ".9rem",
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(1)
    }
}))

export default Category
