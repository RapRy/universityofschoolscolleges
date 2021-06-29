import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authReducer'
import categoriesReducer from './categoriesReducer'
import statsReducer from './statsReducer'
import topicsReducer from './topicsReducer'

export default configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        stats: statsReducer,
        topics: topicsReducer
    }
})