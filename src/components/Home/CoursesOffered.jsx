import React from 'react'
import { Container, Typography, Grid, Box, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import MainHeader from '../Globals/MainHeader'
import TextButton from '../Globals/TextButton'
import OutlinedButton from '../Globals/OutlinedButton'

const CoursesOffered = () => {
    const max900 = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const classes = useStyles()

    return (
        <Container className={classes.mainContainer}>
            <Grid container direction={ max900 ? "column-reverse" : "row" } spacing={2}>
                <Grid item xs={12} md={6}>
                    <MainHeader heading="courses offered" cta="" />
                    <Typography variant="body1" className={classes.paragh}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum faucibus nec sed faucibus egestas etiam dapibus tortor. Proin adipiscing pharetra, mattis adipiscing eget placerat dignissim ipsum. Sed proin ac ut amet aenean nunc metus. Neque consectetur donec phasellus risus elementum sollicitudin vestibulum malesuada pellentesque.
                    </Typography>
                    <Box marginTop="32px">
                        <TextButton text="List of Courses" link="/forum" margin={true} />
                        <OutlinedButton text="Learn how to apply" link="/forum" margin={false} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img className={classes.img} src={`${process.env.PUBLIC_URL}/assets/courses.png`} alt="courses" />
                </Grid>
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    mainContainer: {
        marginTop: theme.spacing(15)
    },
    paragh: {
        textAlign: 'justify',
        color: theme.palette.primary.light,
        fontSize: ".9rem",
        lineHeight: "1.8"
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            width: "80%",
            height: "80%",
            marginLeft: "10%",
            marginBottom: theme.spacing(3)
        },
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: "100%",
            marginLeft: "0",
            marginBottom: theme.spacing(3)
        }
    }
}))

export default CoursesOffered
