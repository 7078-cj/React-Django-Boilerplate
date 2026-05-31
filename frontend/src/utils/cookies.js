export const Cookie = {
    get(name) {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1] || null;
    },

    set(name, value, seconds) {
        document.cookie = `${name}=${value}; max-age=${seconds}; path=/`;
    },

    delete(name) {
        document.cookie = `${name}=; max-age=0; path=/`;
    }
};

export function getUserFromCookie() {
    try {
        const raw = Cookie.get("user");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}