import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteIcon from '@material-ui/icons/Delete'

import IconBtn from '../../Globals/IconBtn'

const CategoryHeader = ({ cat }) => {
    const classes = useStyles()

    const handleAddTopic = () => {
        console.log('add')
    }

    const handleDelete = () => {
        console.log('delete')
    }

    return (
        <Grid container direction="row" alignItems="center" justify="space-between" spacing={1} style={{ paddingBottom: "20px" }}>
            <Grid item md={"auto"} xs={12}>
                <Typography variant="h4" className={classes.typoH4}>{ cat.name }</Typography>
            </Grid>
            <Grid item md={"auto"} xs={12}>
                <Grid container direction="row" className={classes.statsGrid}>
                    <Grid item xs={"auto"} style={{marginRight: "15px"}}>
                        <Typography variant="h5" className={classes.typoH5}>{cat.meta.topics}</Typography>
                        <Typography variant="body1" className={classes.body1}>Topics</Typography>
                    </Grid>

                    <Grid item xs={"auto"}>
                        <Typography variant="h5" className={classes.typoH5}>{cat.meta.replies}</Typography>
                        <Typography variant="body1" className={classes.body1}>Replies</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={8} xs={12}>
                <Grid container direction="row" justify="flex-end">
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
