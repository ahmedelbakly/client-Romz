import isAuthenticated from './PrivateRoute '

export const hasRequiredPermissions = (user, resource, actions) => {
  const hasAllPermissions = actions.every(action =>
    isAuthenticated(user, resource, action)
  )

  if (!hasAllPermissions) {
    return false
  }

  return true
}
