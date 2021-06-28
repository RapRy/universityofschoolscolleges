import React from 'react'
import { Container, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const PanelHeader = ({ title }) => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography variant="h6" className={classes.typoH6}>{ title }</Typography>
            <Divider />
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        padding: "5px 0",
        marginTop: "30px"
    },
    typoH6: {
        color: theme.palette.secondary.dark,
        fontSize: ".9rem",
        fontWeight: 700,
        textTransform: "uppercase",
        marginBottom: "5px"
    }
}))

export default PanelHeader
