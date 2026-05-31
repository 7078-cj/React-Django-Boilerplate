const trim = (v) => (v == null ? "" : String(v)).trim();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginFields(username, password) {
    const errors = {};
    if (!trim(username)) errors.username = "Username is required.";
    if (!trim(password)) errors.password = "Password is required.";
    return { valid: Object.keys(errors).length === 0, errors };
}