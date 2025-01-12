import './App.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/auth/login'
import SignUp from './components/auth/Register'
import { UserProvider } from './context/UserContext'
import Navbar from './components/main/navbar'
import Loading from './components/main/loading'
import Protected from './helper/protect'
import Users from './components/user/users'
import Tasks from './components/task/tasks'
import AddUserForm from './components/user/addNewUser'
import AddRoleForm from './components/role/addNewRole'
import AddTaskForm from './components/task/addTask'
import Roles from './components/role/Role'
import HomePage from './components/profile/profile'
import EditRoleForm from './components/role/EditRoleForm'
import NotFound from './helper/Not-found'
import EditUserForm from './components/user/editUsaer'
import EditTaskForm from './components/task/EditTaskForm'
import TwoFactor from './components/auth/two-factor-page'

function App () {
  // Define routes with a `protected` flag where necessary
  const routes = [
    { path: '/signin', element: <SignIn />, protected: false },
    { path: '/signup', element: <SignUp />, protected: false },
    { path: '/users', element: <Users />, protected: true },
    { path: '/users/add', element: <AddUserForm />, protected: true },
    { path: '/users/edit/:userId', element: <EditUserForm />, protected: true },

    { path: '/tasks', element: <Tasks />, protected: true },
    { path: '/tasks/add', element: <AddTaskForm />, protected: true },
    { path: '/tasks/edit/:taskId', element: <EditTaskForm />, protected: true },

    { path: '/roles', element: <Roles />, protected: true },
    { path: '/roles/add', element: <AddRoleForm />, protected: true },
    { path: '/roles/edit/:roleId', element: <EditRoleForm />, protected: true },

    { path: '/', element: <HomePage />, protected: true },
    { path: '*', element: <NotFound />, protected: false },
    { path: '/two-factor', element: <TwoFactor />, protected: false },
     // Handle 404 errors
  ]

  return (
    <Router>
      <UserProvider>
        <div className='app-container'>
          <Loading />
          <Navbar />
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <Protected>{route.element}</Protected>
                  ) : (
                    route.element
                  )
                }
              />
            ))}
          </Routes>
          <ToastContainer />
        </div>
      </UserProvider>
    </Router>
  )
}

export default App
