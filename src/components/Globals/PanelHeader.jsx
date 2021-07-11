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
        padding: theme.spacing(1, 0),
        marginTop: theme.spacing(4)
    },
    typoH6: {
        color: theme.palette.secondary.dark,
        fontSize: ".9rem",
        fontWeight: theme.typography.fontWeightBold,
        textTransform: "uppercase",
        marginBottom: theme.spacing(1)
    }
}))

export default PanelHeader
