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
        hotTopics: []
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
                        latestTopics: result[0].data,
                        hotTopics: result[1].data
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
                        <Grid item md={6}>
                            <Typography variant="h6" className={classes.typoH6}>Latest Topics</Typography>
                            {
                                topics.latestTopics.map(top => <TopicThumb top={top} key={top._id} />)
                            }
                        </Grid>
                }

                {
                    topics.hotTopics.length > 0 &&
                        <Grid item md={6}>
                            <Typography variant="h6" className={classes.typoH6}>Hot Topics</Typography>
                            {
                                topics.hotTopics.map(top => <TopicThumb top={top} key={top._id} />)
                            }
                        </Grid>
                }
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.secondary.light,
        marginTop: "30px",
        padding: "20px"
    },
    gridContainer: {
        marginTop: theme.spacing(2)
    },
    typoH6: {
        color: theme.palette.secondary.dark,
        fontSize: ".9rem",
        fontWeight: 700,
        marginBottom: theme.spacing(1)
    }
}))

export default Category
