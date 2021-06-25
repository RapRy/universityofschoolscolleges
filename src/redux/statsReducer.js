import { createSlice } from '@reduxjs/toolkit'

export const statsSlice = createSlice({
    name: "statsSlice",
    initialState: {
        activeUsersCount: 0,
        registeredUsersCount: 0,
        categoriesCount: 0,
        topicsCount: 0,
        repliesCount: 0
    },
    reducers: {
        update_count: (state, action) => {
            const { activeUsersCount, categoriesCount, registeredUsersCount } = action.payload

            state.activeUsersCount = activeUsersCount
            state.categoriesCount = categoriesCount
            state.registeredUsersCount = registeredUsersCount
        }
    }
})

export const { update_count } = statsSlice.actions

export default statsSlice.reducer