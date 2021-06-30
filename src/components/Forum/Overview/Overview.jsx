import React from 'react'
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { ForumStatsPanel } from '../../Panels';

const Overview = () => {
    const classes = useStyles();

    return (
        <Container>
            <Typography className={classes.typoH2} variant="h2">Overview</Typography>
            <ForumStatsPanel />
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    typoH2: {
        fontWeight: 700,
        fontSize: "1.2rem",
        marginTop: "40px",
        textTransform: "uppercase",
        color: theme.palette.secondary.dark
    }
}))

export default Overview