export const getUser = () => {
  const userId = sessionStorage.getItem('userId');
  console.log(userId);
  if (userId) return JSON.parse(userId).userId;
  else return null;
}

export const setUserSession = (userId) => {
  sessionStorage.setItem('userId', JSON.stringify(userId));
}

export const removeUserSession = () => {
  sessionStorage.removeItem('userId');
}