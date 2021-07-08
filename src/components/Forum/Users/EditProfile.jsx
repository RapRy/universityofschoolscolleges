import React from 'react'
import { Container } from '@material-ui/core'

import PanelHeader from '../../Globals/PanelHeader'
import EditProfileForm from '../../Globals/Forms/EditProfileForm'

const EditProfile = () => {
    return (
        <Container>
            <PanelHeader title="edit profile" />
            <EditProfileForm />
        </Container>
    )
}

export default EditProfile
