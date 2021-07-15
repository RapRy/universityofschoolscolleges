import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const MainHeader = ({ heading, cta }) => {
    const classes = useStyles()

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={9} md={11}>
                <Typography variant="h3" className={classes.header}>{heading}</Typography>
            </Grid>
            {
                cta !== "" &&
                    <Grid item xs={3} sm={2} md={'auto'} style={{ textAlign: "right" }}>
                        <Link to="#" className={classes.cta}>{cta}</Link>
                    </Grid> 
            }
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    header: {
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBlack,
        color: theme.palette.secondary.dark,
        fontSize: "1.1rem",
        marginBottom: theme.spacing(3)
    },
    cta: {
        textTransform: "uppercase",
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.secondary.main,
        fontSize: ".8rem",
        textDecoration: 'none',
        '&:hover': {
            color: theme.palette.secondary.dark
        }
    }
}))

export default MainHeader
