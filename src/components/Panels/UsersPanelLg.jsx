import React, { useEffect } from 'react'
import { Container, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'

import PanelHeader from '../Globals/PanelHeader'
import UserThumbnailPanel from '../Forum/Users/UserThumbnailPanel'

const UsersPanelLg = ({ header, API, reduxDispatch, selectorName }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const { url } = useRouteMatch()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data, status } = await API(6)

                if(status === 200) dispatch(reduxDispatch(data))
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsers()
    }, [dispatch])

    return (
        <Container className={classes.mainContainer}>
            <PanelHeader title={header} />
            <Container className={classes.subContainer}>
                {
                    users[selectorName] &&
                        users[selectorName].map(user => <UserThumbnailPanel user={user} type={selectorName} key={user._id} />)
                }
                <Link to={`${url}/${header.replace(" ", "-")}`} style={{ textDecoration: "none" }}>
                    <Button variant="text" type="submit" className={classes.buttonSubmit}>more</Button>
                </Link>
            </Container>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    mainContainer:{
        padding: 0
    },
    subContainer:{
        padding: theme.spacing(1),
        background: theme.palette.primary.contrastText,
        marginTop: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[7]
    },
    buttonSubmit: {
        borderRadius: "0px",
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        fontSize: ".9rem",
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.secondary.main,
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing(1)}px auto 0`
        }
    }
}))

export default UsersPanelLg
