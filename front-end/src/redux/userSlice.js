import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        id: 0,
        username: "",
        email: "",
        phone_number: "",
        merchant_status: false,
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.id = action.payload.id;
            state.value.username = action.payload.username;
            state.value.email = action.payload.email;
            state.value.phone_number = action.payload.phone_number;
            state.value.merchant_status = action.payload.merchant_status;
        },
        logout: (state) => {
            state.value.id = 0;
            state.value.username = "";
            state.value.email = "";
            state.value.phone_number = "";
            state.value.merchant_status = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
