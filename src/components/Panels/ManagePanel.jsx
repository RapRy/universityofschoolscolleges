import React from 'react'
import { Container, Grid } from '@material-ui/core'

import PanelHeader from '../Globals/PanelHeader'
import PanelButton from '../Globals/PanelButton'

const ManagePanel = ({ manage }) => {

    return (
        <Grid item xs={12} sm={6} md={12}>
            <Container style={{ padding: "0"}}>
                <PanelHeader title={manage.header} />
                {
                    manage.options.map((opt, i) => <PanelButton opt={opt} key={i} />)
                }
            </Container>
        </Grid>
    )
}

export default ManagePanel
