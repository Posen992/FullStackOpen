import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken(state, action) {
			return {
				token: action.payload,
			}
		},
		clearToken(state, action) {
			return initialState
		},
	},
})

export const { setToken, clearToken } = userSlice.actions
export default userSlice.reducer
