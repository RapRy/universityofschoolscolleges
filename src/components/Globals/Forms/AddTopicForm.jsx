import React, { useState, useEffect } from 'react'
import { Container, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import PublishIcon from '@material-ui/icons/Publish';
import { useSnackbar } from 'notistack'

import Input from './Input'
import TextArea from './TextArea'
import { publish_topic, update_topic } from '../../../redux/topicsReducer';
import * as api from '../../../api'

const initialErrors = { title: "", ref: { category: "" }, description: "" };
const initialState = { title: "", ref: { category: "", creator: JSON.parse(localStorage.getItem('profile'))?.result?._id }, description: "" };

const AddTopicForm = ({ action }) => {
    const classes = useStyles()

    const { categories, selectedCat } = useSelector(state => state.categories)
    const { selectedTopic } = useSelector(state => state.topics)
    const dispatch = useDispatch()

    const [errors, setErrors] = useState(initialErrors)
    const [formData, setFormData] = useState(initialState)
    const [select, setSelect] = useState("")

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

        if(formData.ref.category === "" || formData.ref.category === "select category" || formData.ref.category === null){
            setErrors({ ...errors, ['ref']: { ['category']: "Field required." } })
            return
        }

        if(action === "edit"){
            console.log(action)
            const { data, status } = await api.updateTopic(formData)

            if(status === 200){
                if(data.status === 0){
                    setErrors({ ...errors, ['title']: data.message })
                    return
                }

                if(selectedCat._id === data.result.ref.category) dispatch(update_topic(data.result))

                enqueueSnackbar(`update successful`, { variant: "success" })

                const cat = categories.filter(({ name }) => name === select)
                const ref = { ...initialState.ref, ['category']: cat[0]._id }

                setFormData({ ...initialState, ['ref']: ref })
            }

            return
        }

        const { data, status } = await api.publishTopic(formData)

        if(status === 200){
            if(data.status === 0){
                setErrors({ ...errors, ['title']: data.message })
                return
            }

            if(selectedCat._id === data.result.ref.category) dispatch(publish_topic(data.result))

            enqueueSnackbar(`${formData.title} publish at ${select}`, { variant: "success" })

            const cat = categories.filter(({ name }) => name === select)
            const ref = { ...initialState.ref, ['category']: cat[0]._id }

            setFormData({ ...initialState, ['ref']: ref })
        }
        
    }

    useEffect(() => {
        setSelect(selectedCat.name)
        const ref = { ...formData.ref, ['category']: selectedCat._id || null }
        
        if(action === "edit"){
            setFormData({ ...formData, ['ref']: ref, ['title']: selectedTopic.topic.title, ['description']: selectedTopic.topic.description, topicId: selectedTopic.topic._id })
        }else{
            setFormData({ ...formData, ['ref']: ref })
        }

    }, [selectedCat])

    return (
        <Container classes={{ root: classes.containerRoot }}>
            <form onSubmit={handleFormSubmit}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container direction="row" justify="space-around" alignItems='center' spacing={2}>
                            <Grid item md={9}>
                                <Input type="text" name="title" label="set title" handleInputChange={handleInputChange} errors={errors} value={formData.title} />
                            </Grid>
                            <Grid item md={3}>
                                <FormControl classes={{ root: classes.formControl }} error={ errors.ref.category !== "" ? true : false }>
                                    <InputLabel id="demo-simple-select-error-label" classes={{ root: classes.label }}>
                                        { errors.ref.category !== "" ? errors.ref.category : "select category" }
                                    </InputLabel>
                                    <Select
                                        disableUnderline
                                        variant="filled"
                                        labelId="demo-simple-select-error-label"
                                        id="demo-simple-select-error"
                                        value={select || ""}
                                        onChange={handleSelectChange}
                                        classes={{
                                            root: classes.select
                                        }}
                                        inputProps={{
                                            classes: {
                                                root: classes.input
                                            }
                                        }}
                                    >
                                    <MenuItem value="" disabled classes={{ root: classes.input }}>
                                        <em>select category</em>
                                    </MenuItem>
                                        {
                                            categories.map((cat) => <MenuItem classes={{ root: classes.input }} key={cat._id} value={cat.name}>{cat.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextArea type="text" name="description" label="set description" handleInputChange={handleInputChange} errors={errors} rows={6} margin={true} value={formData.description} />
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
        background: theme.palette.secondary.light,
        marginTop: "30px"
    },
    buttonSubmit: {
        borderRadius: "0px",
        margin: "16px auto",
        fontSize: ".9rem",
        fontWeight: 300,
        color: theme.palette.secondary.contrastText,
        padding: "10px 20px",
        background: theme.palette.primary.dark,
        '&:hover': {
            background: theme.palette.primary.dark
        },
        [theme.breakpoints.down('xs')]: {
            margin: "6px auto 0"
        }
    },
    formControl: {
        marginTop: "10px",
        width: "100%"
    },
    label: {
        fontSize: ".8rem",
        color: theme.palette.secondary.dark,
        marginLeft: "10px",
        zIndex: 2
    },
    select: {
        background: theme.palette.secondary.contrastText,
        borderRadius: "0px",
    },
    input: {
        fontSize: ".8rem",
        fontWeight: 700,
        color: theme.palette.secondary.dark,
        background: theme.palette.secondary.contrastText,
        borderRadius: "0px"
    }
}))

export default AddTopicForm
