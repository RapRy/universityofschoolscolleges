import { createSlice } from '@reduxjs/toolkit'

export const statsSlice = createSlice({
    name: "stats",
    initialState: {
        activeUsersCount: 0,
        registeredUsersCount: 0,
        categoriesCount: 0,
        topicsCount: 0,
        repliesCount: 0
    },
    reducers: {
        update_count: (state, action) => {
            const { activeUsersCount, categoriesCount, registeredUsersCount, topicsCount, repliesCount } = action.payload

            state.activeUsersCount = activeUsersCount
            state.categoriesCount = categoriesCount
            state.registeredUsersCount = registeredUsersCount
            state.topicsCount = topicsCount
            state.repliesCount = repliesCount
        }
    }
})

export const { update_count } = statsSlice.actions

export default statsSlice.reducer