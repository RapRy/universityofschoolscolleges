import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const CategoryHeader = ({ cat }) => {
    const classes = useStyles()

    return (
        <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item md={"auto"} xs={12}>
                <Typography variant="h4" className={classes.typoH4}>{ cat.name }</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
                <Grid container direction="row" justify="flex-start" className={classes.statsGrid}>
                    <Grid item xs={'auto'} container direction="row" alignItems="center">
                        <Typography variant="h5" className={classes.typoH5}>{cat.meta.topics}</Typography>
                        <Typography variant="body1" className={classes.body1}>Topics</Typography>
                    </Grid>

                    <Grid item xs={'auto'} container direction="row" alignItems="center">
                        <Typography variant="h5" className={classes.typoH5}>{cat.meta.replies}</Typography>
                        <Typography variant="body1" className={classes.body1}>Replies</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles({
    typoH4: {
        color: "#4f4f4f",
        fontSize: '.95rem',
        fontWeight: 700
    },
    statsGrid: {
        padding:"5px 15px",
        background: "#F2F2F2"
    },
    typoH5: {
        color: "#4f4f4f",
        fontSize: '1.2rem',
        fontWeight: 900,
        marginRight: "5px"
    },
    body1: {
        color: "#828282",
        fontSize: '.8rem',
    }
})

export default CategoryHeader
