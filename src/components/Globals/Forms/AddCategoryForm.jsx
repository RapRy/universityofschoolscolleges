import React, { useState } from 'react'
import { Container, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { useDispatch } from 'react-redux';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css'
import { store as notif } from 'react-notifications-component'

import Input from './Input';
import * as api from '../../../api';
import { add_category } from '../../../redux/categoriesReducer';

const initialErrors = { name: "" };
const initialState = { name: "" };

const AddCategoryForm = () => {
    const classes = useStyles()

    const dispatch = useDispatch();

    const [errors, setErrors] = useState(initialErrors)
    const [formData, setFormData] = useState(initialState) 

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
                notification('warning', data.message);
                return
            }
            
            dispatch(add_category({ ...data.result }));

            notification("success", `${formData.name} added`)

            setFormData({ name: "" })
        }
    }

    return (
        <Container className={classes.container}>
           <form onSubmit={handleFormSubmit}>
               <Grid container direction="row" justify="space-evenly" spacing={2}>
                   <Grid item xs={9}>
                        <Input type={"text"} name={"name"} label={"set category name"} handleInputChange={handleInputChange} errors={errors} />
                   </Grid>
                   <Grid item xs={3}>
                        <Button type="submit" className={classes.buttonSubmit} startIcon={<CreateNewFolderIcon />}>ADD CATEGORY</Button>
                   </Grid>
               </Grid>
            </form> 
        </Container>
    )
}

const useStyles = makeStyles({
    container: {
        background: "#E0E0E0",
        marginTop: "30px",
        paddingBottom: "8px"
    },
    buttonSubmit: {
        borderRadius: "0px",
        margin: "16px auto 0",
        fontSize: ".9rem",
        fontWeight: 300,
        color: "#f2f2f2",
        padding: "13px 15px",
        background: "#828282"
    }
})

const notification = (messageType, message) => {
    notif.addNotification({
        message,
        type: messageType,
        insert: "top-center",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 6000,
            onScreen: true
        }
    })
}

export default AddCategoryForm
