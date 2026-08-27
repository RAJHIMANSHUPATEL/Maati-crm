import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sidebarShow: true,
    theme: 'light',
    sidebarUnfoldable: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        set: (state, action) => {
            Object.assign(state, action.payload)
        },
    },
})

export const { set } = appSlice.actions
export default appSlice.reducer