import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

import CategoryHeader from './CategoryHeader';

const Category = ({ cat }) => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <CategoryHeader cat={cat} />
        </Container>
    )
}

const useStyles = makeStyles({
    container: {
        background: "#E0E0E0",
        marginTop: "30px",
        padding: "20px"
    }
})

export default Category
