import React from 'react'
import { Container } from '@material-ui/core'

import PanelHeader from '../Globals/PanelHeader'
import PanelButton from '../Globals/PanelButton'

const ManagePanel = ({ manage }) => {

    return (
        <Container style={{ padding: "0"}}>
            <PanelHeader title={manage.header} />
            {
                manage.options.map((opt, i) => <PanelButton opt={opt} key={i} />)
            }
        </Container>
    )
}

export default ManagePanel
