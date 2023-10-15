const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token === null)
        return false;
    const expiresAt = JSON.parse(atob(token.split(".")[1])).expiresAt;
    if (expiresAt < new Date().getTime()) {
        localStorage.removeItem("token");
        return false;
    }
    return true;
}

export {
    isLoggedIn,
};