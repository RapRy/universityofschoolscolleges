import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import PanelHeader from '../Globals/PanelHeader'
import PanelButton from '../Globals/PanelButton'
import { update_categories } from '../../redux/categoriesReducer'

const CategoriesPanel = () => {
    const { categories } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            dispatch(update_categories())
        } catch (error) {
            console.log(error)
        }
    }, [dispatch])

    return (
        <Container style={{ padding: "0" }}>
            <PanelHeader title="Categories" />
            {
                categories.map((cat, i) => (
                        <PanelButton opt={cat} key={i}/>
                ))
            }             
        </Container>
    )
}

export default CategoriesPanel