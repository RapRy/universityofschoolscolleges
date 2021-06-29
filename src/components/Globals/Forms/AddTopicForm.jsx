import React, { useState, useEffect } from 'react'
import { Container, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import PublishIcon from '@material-ui/icons/Publish';
import { useSnackbar } from 'notistack'

import Input from './Input'
import TextArea from './TextArea'
import * as api from '../../../api'

const initialErrors = { title: "", ref: { category: "" }, description: "" };
const initialState = { title: "", ref: { category: "", creator: JSON.parse(localStorage.getItem('profile')).result._id }, description: "" };

const AddTopicForm = () => {
    const classes = useStyles()

    const { categories, selectedCat } = useSelector(state => state.categories)

    const [errors, setErrors] = useState(initialErrors)
    const [formData, setFormData] = useState(initialState)
    const [select, setSelect] = useState("select category")

    const { enqueueSnackbar } = useSnackbar()

    const handleSelectChange = (e) => {
        setSelect(e.target.value)
        const cat = categories.filter(({ name }) => name === e.target.value)
        
        const updatedRef = { ...formData.ref, ['category']: cat[0]._id }

        setFormData({ ...formData, ['ref']: updatedRef })
        setErrors({ ...errors, ['ref']: { ['category']: "" }})
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if(formData.title === ""){
            setErrors({ ...errors, ['title']: "Field required." })
            return
        }

        if(formData.description === ""){
            setErrors({ ...errors, ['description']: "Field required." })
            return
        }

        if(formData.ref.category === "" || formData.ref.category === "select category"){
            setErrors({ ...errors, ['ref']: { ['category']: "Field required." } })
            return
        }

        const { data, status } = await api.publishTopic(formData)

        if(status === 200){
            if(data.status === 0){
                setErrors({ ...errors, ['title']: data.message })
                return
            }

            enqueueSnackbar(`${formData.title} publish at ${select}`, { variant: "success" })

            const cat = categories.filter(({ name }) => name === select)
            const ref = { ...initialState.ref, ['category']: cat[0]._id }

            setFormData({ ...initialState, ['ref']: ref })
        }
        
    }

    useEffect(() => {
        setSelect(selectedCat.name || "select category")
        const ref = { ...formData.ref, ['category']: selectedCat._id || null }
        setFormData({ ...formData, ['ref']: ref })

    }, [selectedCat])

    return (
        <Container classes={{ root: classes.containerRoot }}>
            <form onSubmit={handleFormSubmit}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container direction="row" justify="space-around" alignItems='center' spacing={2}>
                            <Grid item md={8}>
                                <Input type="text" name="title" label="set title" handleInputChange={handleInputChange} errors={errors} />
                            </Grid>
                            <Grid item md={4}>
                                <FormControl error={ errors.ref.category !== "" ? true : false }>
                                    <InputLabel id="topicSelect">{ errors.ref.category !== "" ? errors.ref.category : "select category" }</InputLabel>
                                    <Select labelId="topicSelect" variant="filled" value={select} onChange={handleSelectChange}>
                                        <MenuItem value="select category" disabled>select category</MenuItem>
                                        {
                                            categories.map((cat) => <MenuItem key={cat._id} value={cat.name}>{cat.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextArea type="text" name="description" label="set description" handleInputChange={handleInputChange} errors={errors} />
                    </Grid>
                    <Grid item>
                        <Button type="submit" className={classes.buttonSubmit} startIcon={<PublishIcon />}>PUBLISH</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    containerRoot: {
        background: theme.palette.secondary.light
    },
    buttonSubmit: {
        borderRadius: "0px",
        margin: "16px auto 0",
        fontSize: ".9rem",
        fontWeight: 300,
        color: theme.palette.secondary.contrastText,
        padding: "13px 15px",
        background: theme.palette.primary.dark,
        '&:hover': {
            background: theme.palette.primary.dark
        },
        [theme.breakpoints.down('xs')]: {
            margin: "6px auto 0"
        }
    }
}))

export default AddTopicForm
