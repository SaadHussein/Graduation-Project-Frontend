import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: ""
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.value;
        },
        setToken(state, action) {
            state.token = action.payload.value;
        }
    }
});

export const { setUser, setToken } = globalSlice.actions;

export default globalSlice.reducer;