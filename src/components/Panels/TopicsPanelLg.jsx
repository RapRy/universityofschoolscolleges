import React, { useEffect } from 'react'
import { Container, Grid, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import { useRouteMatch } from 'react-router-dom';

import PanelHeader from '../Globals/PanelHeader'
import TopicWithoutThumbnail from '../Globals/Topics/TopicWithoutThumbnail'

const TopicsPanelLg = ({ header, API, reduxDispatch, selectorName }) => {
    const dispatch = useDispatch()
    const topics = useSelector(state => state.topics)

    const classes = useStyles()

    const { url } = useRouteMatch()

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const { data, status } = await API(10)

                if(status === 200){
                    dispatch(reduxDispatch(data))
                }
            } catch (error) {
                console.log(error)
            }
        } 

        fetchTopics()
    }, [dispatch])

    return (
        <Container className={classes.mainContainer}>
            <PanelHeader title={header} />
            <Container className={classes.subContainer}>
                <Grid container direction="row" spacing={2}>
                    {
                        topics[selectorName].map(top => (
                            <Grid item xs={12} md={6} key={top._id}>
                                <TopicWithoutThumbnail topic={top} selectorName={selectorName} />
                            </Grid>
                        ))
                    }
                </Grid>
                <Link to={`${url}/${header.replace(" ", "-")}`} style={{ textDecoration: "none" }}>
                    <Button type="submit" className={classes.buttonSubmit} startIcon={<VisibilityIcon />}>VIEW ALL</Button>
                </Link>
            </Container>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    mainContainer:{
        padding: 0
    },
    subContainer:{
        padding: theme.spacing(1),
        background: theme.palette.primary.contrastText,
        marginTop: theme.spacing(1)
    },
    buttonSubmit: {
        borderRadius: "0px",
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        fontSize: ".9rem",
        fontWeight: 300,
        color: theme.palette.secondary.contrastText,
        padding: "7px 15px",
        background: theme.palette.primary.main,
        '&:hover': {
            background: theme.palette.primary.main
        },
        [theme.breakpoints.down('xs')]: {
            margin: "6px auto 0"
        }
    }
}))

export default TopicsPanelLg
