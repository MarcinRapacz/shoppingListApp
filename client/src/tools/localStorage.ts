export const setToken = (token: string) => localStorage.setItem("token", token);
export const resetToken = () => localStorage.removeItem("token");
export const getToken = () => localStorage.getItem("token");
