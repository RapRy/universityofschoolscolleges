import React, { useEffect } from 'react'
import { Typography, Container, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';

import AddCategoryForm from '../../Globals/Forms/AddCategoryForm';
import { update_categories } from '../../../redux/categoriesReducer';
import Category from './Category';

const Categories = () => {
    const classes = useStyles();
    
    const { status, categories } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    useEffect(() => {

        try {
            dispatch(update_categories())
        } catch (error) {
            console.log(error)
        }
    }, [dispatch])

    return (
        <Container>
           <Typography className={classes.typoH2} variant="h2">Categories</Typography>
           <AddCategoryForm />

           { status === "loading" && <LinearProgress style={{ margin: "30px 0" }} /> }
           
           {
               categories.map((cat) => (
                   <Category key={cat._id} cat={cat} />
               ))
           }
        </Container>
    )
}

const useStyles = makeStyles({
    typoH2: {
        fontWeight: 700,
        fontSize: "1.2rem",
        marginTop: "40px",
        textTransform: "uppercase",
        color: "#4F4F4F"
    }
})

export default Categories
