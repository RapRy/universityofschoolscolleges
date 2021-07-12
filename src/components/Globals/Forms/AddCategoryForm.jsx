import React, { useState } from 'react'
import { Container, Button, Grid, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack'

import Input from './Input';
import * as api from '../../../api';
import { add_category } from '../../../redux/categoriesReducer';

const initialErrors = { name: "" };
const initialState = { name: "" };

const AddCategoryForm = () => {
    const classes = useStyles()
    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))

    const dispatch = useDispatch();

    const [errors, setErrors] = useState(initialErrors)
    const [formData, setFormData] = useState(initialState) 

    const { enqueueSnackbar } = useSnackbar()

    const handleInputChange = (e) => {
        setFormData({ name: e.target.value })
        setErrors({ name: "" })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if(formData.name === ""){
            setErrors({ name: "Field required." })
            return
        }

        let { data, status } = await api.addCategory(formData)

        if(status === 200){

            if(data.status === 0){
                setErrors({ name: data.message })
                return
            }
            
            dispatch(add_category({ ...data.result }));

            enqueueSnackbar(`${formData.name} added`, { variant: "success" })

            setFormData({ name: "" })
        }
    }

    return (
        <Container className={classes.container}>
           <form onSubmit={handleFormSubmit}>
               <Grid container direction="row" spacing={max600 === true ? 0 : 2}>
                   <Grid item sm={9} xs={12}>
                        <Input type={"text"} name={"name"} label={"set category name"} handleInputChange={handleInputChange} errors={errors} />
                   </Grid>
                   <Grid item sm={3} xs={12}>
                        <Button type="submit" fullWidth={max600} className={classes.buttonSubmit} startIcon={<CreateNewFolderIcon />}>ADD CATEGORY</Button>
                   </Grid>
               </Grid>
            </form> 
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        background: theme.palette.primary.contrastText,
        marginTop: theme.spacing(4),
        paddingBottom: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[7],
        [theme.breakpoints.down('xs')]: {
            paddingBottom: theme.spacing(2)
        }
    },
    buttonSubmit: {
        borderRadius: theme.shape.borderRadius,
        margin: `${theme.spacing(2)}px auto 0`,
        fontSize: ".9rem",
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.secondary.contrastText,
        padding: "13px 15px",
        background: theme.palette.primary.dark,
        '&:hover': {
            background: theme.palette.primary.dark
        },
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing(1)} auto 0`
        }
    }
}))

export default AddCategoryForm
