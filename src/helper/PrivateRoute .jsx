const isAuthenticated = (user, item, subItem) => {
  // Validate input to avoid potential runtime errors
  if (!user || !user.role) {
    return false; // User is not authenticated if no role is present
  }

  // Check if the user is a general user or has specific permissions
  const isAuth =
    user.role.name === 'user' || (user.role[item]?.[subItem] ?? false);

  return isAuth;
};

export default isAuthenticated;

