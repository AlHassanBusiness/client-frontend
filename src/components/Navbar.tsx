import { IoMenu as MenuIcon } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { IoMdSearch as SearchIcon } from 'react-icons/io'
import { MdOutlineMail as MailIcon } from 'react-icons/md'
import { IoChevronDown as ArrowDown } from 'react-icons/io5'
import { RxAvatar as Avatar } from 'react-icons/rx'
import logo from '../assets/logo.png'
import ausflag from '../assets/ausflag.png'
type SetOpenType = React.Dispatch<React.SetStateAction<boolean>>

interface NavBarProps {
    open: boolean
    setOpen: SetOpenType
}

const Navbar: React.FC<NavBarProps> = ({ setOpen, open }) => {
    return (
        <div className='min-h-20 bg-secondary text-white p-2 flex justify-between items-center'>
            <Link to={'/'} className='text-3xl font-semibold'>
                <img src={logo} alt='Logo' className='w-28' />
            </Link>
            <div className='flex-row w-[80%] mx-auto  ml-28 gap-4 hidden lg:flex'>
                <div className='relative w-[80%]'>
                    <input
                        type='search'
                        name='search'
                        id='search'
                        placeholder='Search'
                        className='p-2 bg-input w-full rounded-sm text-white placeholder:text-white focus:ring-0 focus:outline-none'
                    />
                    <div className='absolute top-0 right-0 bg-primary py-2.5 px-3 cursor-pointer'>
                        <SearchIcon className='text-xl' />
                    </div>
                </div>
                <div className='flex flex-row justify-center items-center gap-4'>
                    <img
                        src={ausflag}
                        alt='Aus Flag'
                        className='w-7 mr-10 cursor-pointer'
                    />
                    <MailIcon className='text-lg cursor-pointer' />
                    <span className='flex flex-row  justify-center items-center cursor-pointer'>
                        <span>EN</span>
                        <ArrowDown />
                    </span>
                    <Avatar className='text-lg cursor-pointer' />
                </div>
            </div>
            <MenuIcon
                className='text-4xl cursor-pointer'
                onClick={() => setOpen(!open)}
            />
        </div>
    )
}

export default Navbar
