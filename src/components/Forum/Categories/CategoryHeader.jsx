import React from 'react'
import { Typography, Grid, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteIcon from '@material-ui/icons/Delete'

import IconBtn from '../../Globals/IconBtn'
import { set_selected } from '../../../redux/categoriesReducer';

const CategoryHeader = ({ cat, setShowForm, showForm }) => {
    const classes = useStyles()
    const max600 = useMediaQuery(theme => theme.breakpoints.down('xs'))

    const dispatch = useDispatch()

    const handleAddTopic = () => {
        showForm === false && dispatch(set_selected(cat._id))
        setShowForm(prevState => !prevState)
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
                        <Typography variant="h5" className={classes.typoH5}>{cat.meta.topics.length}</Typography>
                        <Typography variant="body1" className={classes.body1}>{ cat.meta.topics.length === 1 ? "Topic" : "Topics" }</Typography>
                    </Grid>

                    <Grid item sm={5}>
                        <Typography variant="h5" className={classes.typoH5}>{cat.meta.replies.length}</Typography>
                        <Typography variant="body1" className={classes.body1}>{ cat.meta.replies.length === 1 ? "Reply" : "Replies" }</Typography>
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

const useStyles = makeStyles(theme => ({
    typoH4: {
        color: theme.palette.primary.dark,
        fontSize: '.95rem',
        fontWeight: 700
    },
    statsGrid: {
        padding:"5px 15px",
        background: theme.palette.secondary.contrastText
    },
    typoH5: {
        color: theme.palette.primary.dark,
        fontSize: '1.2rem',
        fontWeight: 900,
        marginRight: "5px",
        display: "inline-block"
    },
    body1: {
        color: theme.palette.secondary.dark,
        fontSize: '.8rem',
        display: "inline-block"
    }
}))

export default CategoryHeader