import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import PanelHeader from '../Globals/PanelHeader'
import PanelButton from '../Globals/PanelButton'
import * as api from '../../api'
import { update_categories } from '../../redux/categoriesReducer'

const CategoriesPanel = () => {
    const { categories } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const fetchCategories = async () => {
                const { data, status } = await api.getCategories()

                if(status === 200){
                    dispatch(update_categories({
                        categories: data.categories, loading: true
                    }))
                }
            }

            fetchCategories()
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
