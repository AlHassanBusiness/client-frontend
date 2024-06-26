import toast from 'react-hot-toast'
import { api } from '../api/api'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo-dark.png'
import { FaChevronRight } from 'react-icons/fa'
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
        <div className='h-screen overflow-hidden flex justify-start items-center  flex-col gap-y-2 '>
            <img src={logo} alt='Logo' className='mt-2' />
            <div className='lg:w-[350px] min-w-[320px] px-7 py-5 border border-gray-200 rounded-lg flex flex-col shadow-sm'>
                <h4 className='md:text-3xl text-2xl '>Sign in</h4>
                <div className='flex flex-col gap-y-2 mt-7 mb-2'>
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
                    className='bg-primarylight text-gray-900 p-2 rounded-md shadow-sm'
                >
                    Sign in
                </button>
                <span className='text-xs mt-4'>
                    By continuing, you agree to Amazon's{' '}
                    <span className='text-blue-700 hover:underline cursor-pointer hover:text-primary'>
                        {' '}
                        Conditions of Use
                    </span>{' '}
                    and{' '}
                    <span className='text-blue-700 hover:underline cursor-pointer hover:text-primary'>
                        {' '}
                        Privacy Notice
                    </span>
                    .
                </span>
                <Link to={'/'} className=' mt-4  flex items-center'>
                    <FaChevronRight size={9} className='text-gray-700' />
                    <span className='text-blue-700 text-sm hover:underline cursor-pointer hover:text-primary'>
                        {' '}
                        Need Help
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Login
