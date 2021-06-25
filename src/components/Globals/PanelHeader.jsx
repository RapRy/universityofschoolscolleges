import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const PanelHeader = ({ title }) => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography variant="h6" className={classes.typoH6}>{ title }</Typography>
        </Container>
    )
}

const useStyles = makeStyles({
    container: {
        padding: "5px 0",
        borderBottom: "1px solid #c4c4c4",
        marginTop: "30px"
    },
    typoH6: {
        color: "#828282",
        fontSize: ".9rem",
        fontWeight: 700,
        textTransform: "uppercase"
    }
})

export default PanelHeader
