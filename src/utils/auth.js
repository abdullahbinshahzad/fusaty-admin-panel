export const getAccessToken = () => {
  const token = localStorage.getItem('access_token');
  console.log('Retrieved token from localStorage:', token, 'Type:', typeof token);
  return token;
};

export const setAccessToken = (token) => {
  localStorage.setItem('access_token', token);
};

export const removeAccessToken = () => {
  localStorage.removeItem('access_token');
};

export const isAuthenticated = () => {
  return !!getAccessToken();
}; 