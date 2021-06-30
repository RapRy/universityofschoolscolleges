import React, { useState } from 'react'
import { Container, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

import CategoryHeader from './CategoryHeader';
import AddTopicForm from '../../Globals/Forms/AddTopicForm';

const Category = ({ cat }) => {
    const classes = useStyles()

    const [showForm, setShowForm] = useState(false)

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
