import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
  IconButton
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useUser } from '../../hooks/useUser'
import { Link } from 'react-router-dom'
import isAuthenticated from '../../helper/PrivateRoute '

const Navbar = () => {
  const { user, logout } = useUser()

  const [anchorEl, setAnchorEl] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
    setIsMenuOpen(true)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setIsMenuOpen(false)
  }

  return (
    <AppBar position='sticky'>
      <Toolbar>
        {/* Logo or Title */}
        <Typography variant='h6' sx={{ flexGrow: 1, minWidth: 'max-content' }}>
          Task CMS
        </Typography>

        {/* Desktop Menu */}
        <Container
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end'
          }}
        >
          {user ? (
            <>
              <Link to='/'>
                <Button color='inherit'>Home</Button>
              </Link>
              {isAuthenticated(user, 'users', 'read') && (
                <Link to='/users'>
                  <Button color='inherit'>Users</Button>
                </Link>
              )}
              {isAuthenticated(user, 'tasks', 'read') && (
                <Link to='/tasks'>
                  <Button color='inherit'>Tasks</Button>
                </Link>
              )}

              {isAuthenticated(user, 'roles', 'read') && (
                <Link to='/roles'>
                  <Button color='inherit'>Roles</Button>
                </Link>
              )}

              <Button color='inherit' onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to='/signin'>
                <Button color='inherit'>Login</Button>
              </Link>
              <Link to='/signup'>
                <Button color='inherit'>Sign Up</Button>
              </Link>
            </>
          )}
        </Container>

        {/* Mobile Menu Icon */}
        <IconButton
          edge='end'
          color='inherit'
          aria-label='menu'
          onClick={handleMenuOpen}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {user ? (
            <>
              <MenuItem onClick={handleMenuClose}>
                <Button color='inherit' href='/home'>
                  Home
                </Button>
              </MenuItem>
              {isAuthenticated(user, 'users', 'read') && (
                <MenuItem onClick={handleMenuClose}>
                  <Link to='/users'>
                    <Button color='inherit'>Users</Button>
                  </Link>
                </MenuItem>
              )}
              {isAuthenticated(user, 'tasks', 'read') && (
                <MenuItem onClick={handleMenuClose}>
                  <Link to='/tasks'>
                    <Button color='inherit'>Tasks</Button>
                  </Link>
                </MenuItem>
              )}

              {isAuthenticated(user, 'roles', 'read') && (
                <MenuItem onClick={handleMenuClose}>
                  <Link to='/roles'>
                    <Button color='inherit'>Roles</Button>
                  </Link>
                </MenuItem>
              )}
            </>
          ) : (
            <>
              <MenuItem onClick={handleMenuClose}>
                <Link to='/signin'>
                  <Button color='inherit'>Login</Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to='/signup'>
                  <Button color='inherit'>Sign Up</Button>
                </Link>
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
