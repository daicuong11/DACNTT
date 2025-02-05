import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-'>
      <h1 className='font-extrabold text-gray-800 text-9xl animate-bounce'>404</h1>
      <h1 className='mb-4 text-4xl font-bold text-gray-800'>Page Not Found</h1>
      <p className='mb-8 text-lg text-gray-600'>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')} className='btn btn-primary'>
        Go Back
      </button>
    </div>
  )
}

export default NotFoundPage
