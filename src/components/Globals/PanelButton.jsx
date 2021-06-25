import React from 'react'
import { Button } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Link, useRouteMatch } from 'react-router-dom'

const PanelButton = ({ opt }) => {
    const { url } = useRouteMatch()

    return (
        <Link to={`${url}${opt._id !== "" ? `/${opt._id}` : ""}`} style={{ textDecoration: "none" }}>
            <PanButton fullWidth>{ opt.name }</PanButton>
        </Link>
    )
}

const PanButton = styled(Button)({
    background: "#828282",
    borderRadius: "0",
    marginTop: "15px",
    textTransform: "unset",
    "& span": {
        textAlign: "left",
        justifyContent: "initial",
        color: "#f2f2f2",
        fontSize: ".9rem",
        textTransform: "capitalize"
    }
})

export default PanelButton
