import React, { useEffect } from 'react'
import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';

import AddCategoryForm from '../../Globals/Forms/AddCategoryForm';
import * as api from '../../../api';
import { update_categories } from '../../../redux/categoriesReducer';
import Category from './Category';

const Categories = () => {
    const classes = useStyles();
    
    const { loading, categories } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    useEffect(() => {

        try {
            const fetchCategories = async () => {
                const { data, status } = await api.getCategories()

                if(status === 200){
                    dispatch(update_categories({ 
                        categories: data.categories, loading: false 
                    }))
                }
            }

            fetchCategories()
        } catch (error) {
            console.log(error)
        }
    }, [dispatch])

    return (
        <Container>
           <Typography className={classes.typoH2} variant="h2">Categories</Typography>
           <AddCategoryForm />

           { loading &&  <Loader type="ThreeDots" color="#00bfff" height={50} width={100} /> }
           
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
