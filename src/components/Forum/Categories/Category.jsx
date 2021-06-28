import React from 'react'
import { Container, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

import CategoryHeader from './CategoryHeader';

const Category = ({ cat }) => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <CategoryHeader cat={cat} />
            <Divider />
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.secondary.light,
        marginTop: "30px",
        padding: "20px"
    }
}))

export default Category
