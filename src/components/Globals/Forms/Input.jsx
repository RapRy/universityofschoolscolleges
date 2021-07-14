import React, { useState, useContext } from 'react'
import { TextField, IconButton, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { formContext } from '../../Auth/formContext';

const Input = ({ type, label, name, handleInputChange, errors, value }) => {
    const classes = useStyles()

    const [show, setShow] = useState(false)

    const { switchForm } = useContext(formContext)

    return (
        <TextField 
            value={value}
            error={errors[name] === "" ? false : true}
            helperText={errors[name]}
            label={ errors[name] === "" ? label : "Error"} 
            variant="outlined" 
            fullWidth margin="normal" 
            type={
                name === 'password' ?
                    show ? "text" : type
                :
                  type
            } name={name} 
            InputProps={{
                classes: {
                    root: classes.rootRadius,
                    notchedOutline: classes.notchedOutline,
                    input: classes.input
                },
                endAdornment: (
                    name === "password" ?
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShow(!show)}>
                                { show ? <VisibilityOff className={classes.colorIconInvisible} /> : <Visibility className={switchForm ? classes.colorIconOrange : classes.colorIconBlue} /> }
                            </IconButton>
                        </InputAdornment>
                    : null
                )
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

const useStyles = makeStyles(theme => ({
    rootRadius: {
        borderRadius: theme.shape.borderRadius,
        background: theme.palette.secondary.contrastText
    },
    notchedOutline: {
        borderColor: "transparent"
    },
    input: {
        fontSize: ".8rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.dark,
        background: theme.palette.secondary.contrastText,
        borderRadius: theme.shape.borderRadius
    },
    label: {
        fontSize: ".8rem",
        color: theme.palette.secondary.dark
    },
    colorIconOrange: {
        color: theme.palette.secondary.main
    },
    colorIconBlue: {
        color: theme.palette.primary.main
    },
    colorIconInvisible: {
        color: theme.palette.secondary.dark
    }
}))

export default Input
