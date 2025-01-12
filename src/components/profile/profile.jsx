import { useUser } from '../../hooks/useUser'

const HomePage = () => {
  const { user } = useUser()

  const title = `Welcome, ${user?.name} as ${user?.role?.name === 'admin' ? 'Admin' : 'User'}`
  const role = `Your role is ${user?.role?.name}`
  return (
    <div className='min-h-screen bg-gray-100 mt-8 px-4'>
      {/* Header Section */}
      <div className='container mx-auto px-4 py-4'>
      <div className='container  px-4 py-4 bg-stone-800 text-white w-full  rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold text-left  mb-4 capitalize m-0'>{title}</h1>
      <h2 className='text-2xl font-semibold  mb-4 capitalize'>{role}</h2>
      </div>
      </div>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-8 '>
        {user?.role?.name === 'admin' ? (
          <section id='admin' className='mb-12'>
            <h2 className='text-xl font-semibold text-blue-600 mb-4'>
              Admin Panel
            </h2>
            <div className='bg-white shadow rounded p-6'>
              <p className='mb-4 text-gray-700'>
                The Admin panel allows you to manage users, tasks, and system
                configurations.
              </p>
              <ul className='list-disc list-inside text-gray-600'>
                <li>Manage Users</li>
                <li>Create and Assign Tasks to Users</li>
                <li>Manage Tasks </li>
                <li>Manage Roles</li>
            
              </ul>
            </div>
          </section>
        ) : (
          <section id='user'>
            <h2 className='text-xl font-semibold text-green-600 mb-4'>
              User Panel
            </h2>
            <div className='bg-white shadow rounded p-6'>
              <p className='mb-4 text-gray-700'>
                The User panel allows you to view and manage your assigned
                tasks.
              </p>
              <ul className='list-disc list-inside text-gray-600'>
                <li>View Tasks</li>
                <li>Mark Tasks as Completed</li>
              </ul>
            </div>
          </section>
        )}
      </main>

      {/* Footer Section */}
      <footer className='fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 mt-12'>
        <div className='container mx-auto px-4 text-center'>
          <p>&copy; 2025 Task CMS. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
