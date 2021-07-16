import React, { useState } from 'react'
import { Container, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'

import Input from './Input'
import * as api from '../../../api'
import { update_profile } from '../../../redux/authReducer'

const profileLS = JSON.parse(localStorage.getItem('profile'))?.result

const initialErrors = { firstName: "", lastName: "" , username: "", email: "", schoolId: "" };
const initialState = { 
    firstName: profileLS?.name?.firstName, 
    lastName: profileLS?.name?.lastName,
    username: profileLS?.username, 
    email: profileLS?.email, 
    schoolId: profileLS?.schoolId,
    id: profileLS?._id
};

const EditProfileForm = () => {
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState(initialErrors)

    const dispatch = useDispatch()

    const classes = useStyles()

    const { enqueueSnackbar } = useSnackbar()

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if(formData.firstName === ""){
            setErrors({ ...errors, 'firstName': "Field required." })
        }else if(formData.lastName === ""){
            setErrors({ ...errors, 'lastName': "Field required." })
        }else if(formData.username === ""){
            setErrors({ ...errors, 'username': "Field required." })
        }else if(formData.email === ""){
            setErrors({ ...errors, 'email': "Field required." })
        }else if(formData.schoolId === ""){
            setErrors({ ...errors, 'schoolId': "Field required." })
        }else{

            const sendForm = async () => {
                try {
                    const { data, status } = await api.updateUserDetails(formData)

                    if(status === 200){
                        dispatch(update_profile(data))
                        enqueueSnackbar(`update succesful`, { variant: "success" })

                        setErrors(initialErrors)
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            sendForm()
        }

    }

    return (
        <Container classes={{ root: classes.containerRoot }}>
            <form onSubmit={handleFormSubmit}>
                <Grid container direction="row" spacing={2}>
                    <Grid item md={6}>
                        <Input type="text" name="firstName" label="update first name" handleInputChange={handleInputChange} errors={errors} value={formData.firstName} />
                    </Grid>
                    <Grid item md={6}>
                        <Input type="text" name="lastName" label="update last name" handleInputChange={handleInputChange} errors={errors} value={formData.lastName} />
                    </Grid>
                    <Grid item md={6}>
                        <Input type="text" name="username" label="update username" handleInputChange={handleInputChange} errors={errors} value={formData.username} />
                    </Grid>
                    <Grid item md={6}>
                        <Input type="email" name="email" label="update email" handleInputChange={handleInputChange} errors={errors} value={formData.email} />
                    </Grid>
                    <Grid item md={6}>
                        <Input type="text" name="schoolId" label="update school ID" handleInputChange={handleInputChange} errors={errors} value={formData.schoolId} />
                    </Grid>
                    <Grid item md={12}>
                        <Button type="submit" className={classes.buttonSubmit}>Confirm</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    containerRoot: {
        background: theme.palette.secondary.light,
        marginTop: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[7]
    },
    buttonSubmit: {
        borderRadius: theme.shape.borderRadius,
        margin: `${theme.spacing(2)}px auto`,
        fontSize: ".9rem",
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(1, 3),
        background: theme.palette.secondary.main,
        '&:hover': {
            background: theme.palette.secondary.dark
        },
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing(1)}px auto 0`
        }
    },
}))

export default EditProfileForm
