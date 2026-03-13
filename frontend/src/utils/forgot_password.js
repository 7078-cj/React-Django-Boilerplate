const API = import.meta.env.VITE_API_URL;

export const requestReset = async (email) => {

  const res = await fetch(`${API}user/forgot-password/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email })
  });

  return await res.json();
};

export const verifyCode = async (email, code) => {

  const res = await fetch(`${API}user/verify-code/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, code })
  });

  return await res.json();
};

export const resetPassword = async (email, code, password) => {

  const res = await fetch(`${API}user/reset-password/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, code, password })
  });

  return await res.json();
};

export const resendCode = async (email) => {

  const res = await fetch(`${API}user/resend-code/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email })
  });

  return await res.json();
};