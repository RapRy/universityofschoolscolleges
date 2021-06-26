import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { styled } from '@material-ui/styles'

const AdminStatData = ({ numData, stringData }) => {
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
    padding: "5px 25px",
})

const NumType = styled(Typography)({
    fontWeight: 900,
    fontSize: "2.6rem",
    color: "#4F4F4F",
    textAlign: "center",
    marginBottom: "10px"
})

const StringType = styled(Typography)({
    fontWeight: 500,
    color: "#828282",
    textTransform: "uppercase",
    textAlign: "center"
})

export default AdminStatData
