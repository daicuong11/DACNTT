import React, { useEffect } from 'react'
import { useLoginWithEmailAndPassword } from '../../hooks/querys/auth'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setAuth } from '../../features/auth/auth.slice'
import { Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  // const navigate = useNavigate()
  // const currentUser = useAppSelector((state) => state.auth.currentUser)
  // const { mutate, data, isPending, isSuccess } = useLoginWithEmailAndPassword()
  // const dispatch = useAppDispatch()

  // // Xử lý cập nhật auth khi mutation thành công
  // useEffect(() => {
  //   if (isSuccess && data) {
  //     const auth = data.data
  //     dispatch(setAuth(auth))
  //     navigate('/') // Chuyển hướng sau khi login thành công
  //   }
  // }, [isSuccess, data, dispatch, navigate])

  // const handleLogin = () => {
  //   mutate({ email: 'Admin@gmail.com', password: '123456' })
  // }

  // if (isPending) {
  //   return (
  //     <div className='fixed inset-0 flex items-center justify-center'>
  //       <Spin />
  //     </div>
  //   )
  // }

  // return (
  //   <div>
  //     <h1>Login</h1>
  //     <p>{JSON.stringify(currentUser)}</p>
  //     <div className='mt-4 ml-4'>
  //       <Button type='primary' onClick={handleLogin}>
  //         Login
  //       </Button>
  //     </div>
  //   </div>
  // )

  return <div className=''>login</div>
}

export default Login
