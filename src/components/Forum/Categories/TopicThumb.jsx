import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const TopicThumb = ({ top, category }) => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Link to={`/forum/${category.name?.replace(" ", "-")}/${top._id}`} style={{ textDecoration: "none", overflowX: "hidden" }}>
                <Typography variant="h6" className={classes.title}>{ top?.title }</Typography>
            </Link>
            <Typography variant="body1" className={classes.description}>{ top?.description }</Typography>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        background: theme.palette.secondary.contrastText,
        overflowX: 'hidden',
        marginTop: theme.spacing(1)
    },
    title: {
        color: theme.palette.secondary.dark,
        fontSize: ".9rem",
        fontWeight: 700,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflowX: 'hidden'
    },
    description: {
        color: theme.palette.secondary.main,
        fontSize: ".8rem",
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflowX: 'hidden'
    }
}))

export default TopicThumb
