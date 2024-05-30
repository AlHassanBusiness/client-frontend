import toast from 'react-hot-toast'
import { api } from '../api/api'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { loggedIn, setLoggedIn, setUser } = useAuth()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            if (email === '' || password === '') {
                toast.error('All fields are required')
                return
            }
            const response = await api.post('/api/auth/login', {
                email,
                password,
            })

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data))
                const expiryDate = new Date()
                expiryDate.setDate(expiryDate.getDate() + 1)
                localStorage.setItem('expiry', expiryDate.toISOString())
                setLoggedIn(true)
                setUser(response.data)
                toast.success('Login successfull')
                navigate('/')
            }
        } catch (error: object | any) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        loggedIn && navigate('/')
    }, [loggedIn])

    return (
        <div className='h-screen overflow-hidden flex justify-start items-center  flex-col mt-10 gap-y-10'>
            <h4 className='text-3xl font-semibold'>LOGO HERE</h4>
            <div className='lg:min-w-[350px] min-w-[320px] px-7 py-5 border border-gray-200 rounded-sm flex flex-col'>
                <h4 className='md:text-3xl text-2xl font-semibold'>Sign in</h4>
                <div className='flex flex-col gap-y-2 mt-7 mb-4'>
                    <label htmlFor='email' className='text-sm'>
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='p-2 border border-gray-300 focus:ring-0 focus:outline-none rounded-sm shadow-sm'
                    />
                </div>
                <div className='flex flex-col gap-y-2 mb-5'>
                    <label htmlFor='password' className='text-sm'>
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='p-2 border border-gray-300 focus:ring-0 focus:outline-none rounded-sm shadow-sm'
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className='bg-primary text-gray-900 p-2 rounded-sm shadow-sm'
                >
                    Sign in
                </button>
            </div>
        </div>
    )
}

export default Login
