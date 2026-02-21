export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error parsing user:', error);
        return null;
    }
};

export const removeUser = () => {
    localStorage.removeItem('user');
};

export const getToken = () => {
    const user = getUser();
    return user?.token || null;
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const isAdmin = () => {
    const user = getUser();
    return user?.role === 'admin';
};