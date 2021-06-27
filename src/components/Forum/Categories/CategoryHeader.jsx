import React from 'react'
import { Typography, Grid, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteIcon from '@material-ui/icons/Delete'

import IconBtn from '../../Globals/IconBtn'

const CategoryHeader = ({ cat }) => {
    const classes = useStyles()
    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))

    const handleAddTopic = () => {
        console.log('add')
    }

    const handleDelete = () => {
        console.log('delete')
    }

    return (
        <Grid container direction={ max600 === true ? "column" : "row" } alignItems="center" justify="space-between" spacing={ max600 === true ? 3 : 1 } style={{ paddingBottom: "20px" }}>
            <Grid item md={"auto"} sm={12} xs={12}>
                <Typography variant="h4" className={classes.typoH4}>{ cat.name }</Typography>
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
                <Grid container direction="row" className={classes.statsGrid}>
                    <Grid item sm={5} style={{marginRight: "15px"}}>
                        <Typography variant="h5" className={classes.typoH5}>{cat.meta.topics}</Typography>
                        <Typography variant="body1" className={classes.body1}>Topics</Typography>
                    </Grid>

                    <Grid item sm={5}>
                        <Typography variant="h5" className={classes.typoH5}>{cat.meta.replies}</Typography>
                        <Typography variant="body1" className={classes.body1}>Replies</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={7} sm={8} xs={12}>
                <Grid container direction="row" justify={ max600 === true ? "center" : "flex-end" }>
                    <IconBtn icon={<PostAddIcon />} text="Add Topic" handleClick={handleAddTopic} />
                    <IconBtn icon={<DeleteIcon />} text="Delete" handleClick={handleDelete} />
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
        marginRight: "5px",
        display: "inline-block"
    },
    body1: {
        color: "#828282",
        fontSize: '.8rem',
        display: "inline-block"
    }
})

export default CategoryHeader
