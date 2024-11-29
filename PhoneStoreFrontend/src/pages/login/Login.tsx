import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { loginWithEmailAndPassword } from '../../apis/auth.api'
import { useMatch } from 'react-router-dom'

const Login: React.FC = () => {
  const match = useMatch('/')
  console.log('match', match)
  //   const { data, isLoading } = useQuery({
  //     queryKey: ['login'],
  //     queryFn: () => {
  //       return loginWithEmailAndPassword('Admin@gmail.com', '123456')
  //     }
  //   })
  //   console.log('data', data?.data)
  return <div>Login</div>
}

Login.propTypes = {}

export default Login
