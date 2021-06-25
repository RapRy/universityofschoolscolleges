import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    rootRadius: {
        borderRadius: 0
    },
    notchedOutline: {
        borderColor: "transparent"
    },
    input: {
        fontSize: ".8rem",
        fontWeight: 700,
        color: "#4f4f4f",
        background: "#f2f2f2",
        borderRadius: "0px"
    },
    label: {
        fontSize: ".8rem",
        color: "#828282"
    }
})

const Input = ({ type, label, name, handleInputChange, errors }) => {
    const classes = useStyles()

    return (
        <TextField 
            error={errors[name] === "" ? false : true}
            helperText={errors[name]}
            label={ errors[name] === "" ? label : "Error"} 
            variant="outlined" 
            fullWidth margin="normal" 
            type={type} name={name} 
            InputProps={{
                classes: {
                    root: classes.rootRadius,
                    notchedOutline: classes.notchedOutline,
                    input: classes.input
                }
            }}
            InputLabelProps={{
                classes: {
                    root: classes.label
                }
            }}
            onChange={handleInputChange}
        />
    )
}

export default Input
