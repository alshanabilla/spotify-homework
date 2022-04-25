import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    accessToken: string;
    isAuthorize: boolean;
    user: any;
}

const initialState: IinitialState = {
    accessToken: '',
    isAuthorize: false,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthorize = true;
            state.user = action.payload.user;

        },
        logout: (state) => {
            state.accessToken = '';
            state.isAuthorize = false;
            state.user = null;

        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;