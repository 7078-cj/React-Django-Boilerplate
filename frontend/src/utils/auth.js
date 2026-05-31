import { jwtDecode } from "jwt-decode";
import { setAuth, logout } from "../features/auth/authSlice";
import { getRequest } from "./requests";
import { Cookie } from "./cookies";
import { validateLoginFields } from "./validation";

const API_URL = import.meta.env.VITE_API_URL;

/** Clear session and send the user to the login screen. */
export const logoutUser = (dispatch, navigate) => {
    dispatch(logout());

    navigate("/login", { replace: true });
};

export const loginUser = async (e, dispatch, navigate,setError) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const { valid, errors } = validateLoginFields(username, password);
    if (!valid) {
        const first = Object.values(errors)[0];
        setError(first);
        return false;
    }

    try {
        const response = await fetch(API_URL + "user/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.trim(),
                password,
            }),
        });
        if (response.status === 401) {
            setError("Invalid username or password.");
            return false;
        }

        const data = await response.json().catch(() => ({}));

        const tokens = data;
        const user = jwtDecode(tokens.access);

        dispatch(
            setAuth({
                tokens: tokens,
                user: user,
            })
        );

        Cookie.set("access", tokens.access, 540000);
        Cookie.set("refresh", tokens.refresh, 604800);

        navigate("/");
        return true;
    } catch (error) {
        console.error("Error during login:", error);
        return false;
    }
};


export const updateToken = async (dispatch) => {
    const refresh = Cookie.get("refresh");

    if (!refresh) return;

    const response = await fetch(API_URL + "user/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
    });

    const data = await response.json();

    if (response.ok) {
        const newAccess = data.access;

        const user = await getRequest("user/profile/", newAccess);

        const newTokens = {
            access: newAccess,
            refresh: refresh,
        };

        dispatch(
            setAuth({
                tokens: newTokens,
                user: user,
            })
        );

        Cookie.set("access", newAccess, 540000);
        Cookie.set("refresh", refresh, 604800);
    } else {
        dispatch(logout());
    }
};