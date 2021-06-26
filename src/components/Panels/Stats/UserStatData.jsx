import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { styled } from '@material-ui/styles'

const UserStatData = ({ numData, stringData }) => {

    return (
        <Grid item>
            <MainContainer>
                <NumType variant="h2">{numData}</NumType>
                <StringType variant="body1">{stringData}</StringType>
            </MainContainer>
        </Grid>
    )
}

const MainContainer = styled(Container)({
    padding: "15px 0px"
})

const NumType = styled(Typography)({
    fontWeight: 900,
    fontSize: "2rem",
    color: "#4F4F4F",
    display: "inline-block"
})

const StringType = styled(Typography)({
    fontWeight: 500,
    fontSize: ".9rem",
    color: "#828282",
    textTransform: "uppercase",
    display: "inline-block",
    position: "relative",
    bottom: "6px",
    left: "10px"
})

export default UserStatData
