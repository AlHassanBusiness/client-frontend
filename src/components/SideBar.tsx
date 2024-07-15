import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/api'
import toast from 'react-hot-toast'

interface SideBarProps {
    open: boolean
}

const SideBar: React.FC<SideBarProps> = ({ open }) => {
    const navigate = useNavigate()
    const { setLoggedIn, setUser } = useAuth()

    const handleLogout = async () => {
        try {
            const response = await api.post('/api/auth/logout')
            if (response.status === 200) {
                localStorage.removeItem('user')
                localStorage.removeItem('expiry')
                setLoggedIn(false)
                setUser(null)
                toast.error('Logged out')
                navigate('/signin')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className={`flex-col py-5 absolute top-0 left-0 min-h-full gap-y-16 transition-all duration-300 z-50 ease-in bg-white shadow-lg transform w-1/2 lg:w-1/5  ${
                open ? 'translate-x-0' : '-translate-x-[100%]'
            }`}
        >
            <h1 className=' font-bold text-2xl text-center mt-3 mb-14'>
                CLIENT
            </h1>
            <div className='flex flex-col'>
                <NavLink to='/' className='font-bold text-lg pl-3 py-2 '>
                    Dashboard
                </NavLink>

                <NavLink
                    to='/profit-history'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg  py-2 pl-3'
                            : 'font-bold text-lg  py-2  pl-3'
                    }
                >
                    Profit History
                </NavLink>
                <NavLink
                    to='/order-history'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg  py-2 pl-3'
                            : 'font-bold text-lg  py-2  pl-3'
                    }
                >
                    Order History
                </NavLink>
                <NavLink
                    to='/investment-history'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg  py-2 pl-3'
                            : 'font-bold text-lg  py-2  pl-3'
                    }
                >
                    Investment History
                </NavLink>
                <NavLink
                    to='/profile'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg  py-2 pl-3'
                            : 'font-bold text-lg  py-2  pl-3'
                    }
                >
                    Profile
                </NavLink>
                <button
                    onClick={handleLogout}
                    className='font-bold bg-red-400 text-lg  py-2 hover:bg-red-500 mt-10'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default SideBar
