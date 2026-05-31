import { createSlice } from "@reduxjs/toolkit";
import { Cookie } from "../../utils/cookies";

const initialState = {
    access: Cookie.get("access") || null,
    refresh: Cookie.get("refresh") || null,
    user: Cookie.get("user")
        ? JSON.parse(Cookie.get("user"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action) {
            const { tokens, user } = action.payload;

            state.access = tokens.access;
            state.refresh = tokens.refresh;
            state.user = user;

            Cookie.set("access", tokens.access, 540000);
            Cookie.set("refresh", tokens.refresh, 604800);
            Cookie.set("user", JSON.stringify(user), 604800);
        },

        logout(state) {
            state.access = null;
            state.refresh = null;
            state.user = null;

            Cookie.delete("access");
            Cookie.delete("refresh");
            Cookie.delete("user");
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;