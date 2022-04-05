import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: '',
        isAuthorize: false,
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthorize = true;
        }
    }
});

export const { login } = authSlice.actions;

export default authSlice.reducer;