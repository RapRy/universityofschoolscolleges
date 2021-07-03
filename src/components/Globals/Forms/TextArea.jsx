import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const TextArea = ({ type, label, name, handleInputChange, errors, rows, margin, value }) => {
    const classes = useStyles()

    return (
        <TextField
            value={value}
            multiline
            className={classes.padd0}
            rows={rows}
            rowsMax={10}
            error={errors[name] === "" ? false : true}
            helperText={errors[name]}
            label={ errors[name] === "" ? label : "Error"} 
            variant="outlined" 
            fullWidth margin={margin ? "normal" : "none"}
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
                    root: classes.label,
                }
            }}
            onChange={handleInputChange}
        />
    )
}

const useStyles = makeStyles(theme => ({
    rootRadius: {
        borderRadius: 0,
    },
    notchedOutline: {
        borderColor: "transparent"
    },
    input: {
        fontSize: ".8rem",
        fontWeight: 700,
        color: theme.palette.secondary.dark,
        background: theme.palette.secondary.contrastText,
        borderRadius: "0px",
        padding: theme.spacing(1)
    },
    label: {
        fontSize: ".8rem",
        color: theme.palette.secondary.dark
    },
    padd0: {
        '& .MuiOutlinedInput-multiline': {
            padding: 0
        }
    }
}))


export default TextArea
