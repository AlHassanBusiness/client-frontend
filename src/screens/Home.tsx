import { Link } from 'react-router-dom'
import { api } from '../api/api'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaGlobe as GlobeIcon } from "react-icons/fa6";
import toast from 'react-hot-toast'
import { BsThreeDots as DotsIcon } from "react-icons/bs";
import { FaChevronRight as ChevronRight } from "react-icons/fa";
import dashboard1 from "../assets/dashboard-1.png"
import dashboard2 from "../assets/dashboard-2.png"
import SalesHistoryTable from '../components/SalesHistoryTable';

type Product = {
    _id: string 
    name: string 
    image: string 
    saleprice: string 
    costprice: string 
}

type SalesHistory = {
    _id: string 
    product: Product
    customer: string 
    createdAt: string 
}  

const Home = () => {
    const [totalInvestment, setTotalInvestment] = useState<number>(0)
    const [profit, setProfit] = useState<number>(0)
    const [sales,setSales] = useState('')
    const [salesHistory,setSalesHistory] = useState<SalesHistory[]>([])

    const {user} = useAuth()

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await api.get('/api/clientdashboard')
                if (response.status === 200) {
                    setProfit(response.data.profit)
                    setSales(response.data.sales)
                    setTotalInvestment(response.data.totalInvestment)
                    setSalesHistory(response.data.salesHistory)
                }
            } catch (error) {
                toast.error("Error fetching details...")
            }
        }
        getDetails()
    }, [])

    const getCurrentMonthName = () => {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const currentMonthIndex = new Date().getMonth()
        return monthNames[currentMonthIndex]
    }


    return (
        <section className='flex flex-col min-h-screen mt-5 px-5 my-5'>
            <div className='flex flex-row justify-start items-center gap-4 flex-wrap w-full'>
            <div className='bg-white border border-gray-300 p-4 flex flex-row justify-center items-center gap-y-3 md:min-w-[250px] w-[170px] gap-5'>
                    <div>
                        <GlobeIcon className='text-tertiary lg:text-4xl text-2xl' />
                    </div>
                    <div className='flex flex-col gap-y-3 '>
                        <h4 className='md:text-xl text-[15px] uppercase'>
                            Market Places 
                        </h4>
                        <span className='md:text-2xl text-xl text-tertiary font-extrabold'>
                            1
                        </span>
                    </div>
                </div>
                <div className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px]'>
                    <h4 className='md:text-xl text-[15px] uppercase'>
                        Total Sales of {getCurrentMonthName()}
                    </h4>
                    <span className='md:text-2xl text-xl text-tertiary font-extrabold'>
                        {sales ? `$${sales}` : '...'}
                    </span>
                </div>
                <div className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px]'>
                    <h4 className='md:text-xl text-[15px] uppercase'>
                        Active Investment
                    </h4>
                    <span className='md:text-2xl text-xl text-tertiary font-extrabold'>
                        {totalInvestment ? `$${totalInvestment}` : '...'}
                    </span>
                </div>
                <div className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px]'>
                    <h4 className='md:text-xl text-[15px] uppercase'>
                        Profit of {getCurrentMonthName()}
                    </h4>
                    <span className='md:text-2xl text-xl text-tertiary font-extrabold'>
                        {profit ? `$ ${profit}` : '....'}
                    </span>
                </div>
                <div className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px]'>
                    <h4 className='md:text-xl text-[15px] uppercase'>Store</h4>
                    <span className='md:text-2xl text-xl text-tertiary font-extrabold'>
                        {user?.store.name}
                    </span>
                </div>
                <Link
                    to={'/profit-history'}
                    className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px] cursor-pointer'
                >
                    <h4 className='md:text-xl text-[15px] uppercase'>Profit History</h4>
                    <span className='md:text-2xl text-xl text-tertiary font-extrabold'>
                        ----
                    </span>
                </Link>
                <Link
                    to={'/investment-history'}
                    className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px] cursor-pointer'
                >
                    <h4 className='md:text-xl text-[15px] uppercase'>
                        Investment History
                    </h4>
                    <span className='md:text-2xl text-xl text-tertiary font-extrabold'>
                        ----
                    </span>
                </Link>
            </div>
            <div className='max-w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mx-10 md:mx-0 mt-14 gap-5'>
                <div className='bg-white border min-h-[400px] shadow-md flex flex-col gap-y-2'>
                    <h3 className='text-2xl font-semibold p-4'>Match Competitive Price</h3>
                    <div className='bg-slate-100 p-14'>
                    </div>
                    <div className='flex flex-col gap-y-1 px-5 text-secondary'>
                        <p className='flex flex-row justify-between items-center'>
                            <span>Suggested Price</span>
                            <span>$13.98</span>
                        </p>
                        <p className='flex flex-row justify-between items-center'>
                            <span>Price + Shipping</span>
                            <span>$13.98 + $0.0</span>
                        </p>
                        <p className='flex flex-row justify-between items-center'>
                            <span>Current Offers </span>
                            <span>2</span>
                        </p>
                    </div>
                    <div className='bg-slate-100 flex flex-col gap-y-1 p-5 text-secondary'>
                        <p className='flex flex-row justify-between items-center'>
                            <span className='font-semibold text-black'>Your Price </span>
                            <span>$ <span className='px-3 bg-white border'>14.99</span> </span>
                        </p>
                        <p className='flex flex-row justify-between items-center'>
                            <span className='font-semibold '>Price + Shipping </span>
                            <span>$13.98 + $0.0</span>
                        </p>
                    </div>
                    <p className='px-5 py-3 text-center text-secondary '>Dismiss</p>
                </div>
                <div className='bg-white border min-h-[400px] shadow-md flex flex-col '>
                    <h3 className='text-2xl font-semibold p-4'>Purchased Orders</h3>
                    <div className='bg-slate-200 p-9 text-secondary text-lg'>
                        <p className='lg:max-w-[70%]'>You have orders that require a response</p>
                    </div>
                    <div className='flex w-full px-5 text-secondary'>
                        <div className='text-4xl w-[20%] py-20 font-semibold'>34</div>
                        <div className='border-l w-[80%] p-2 flex justify-center items-center font-semibold text-lg'>Over 24 hours orders </div>
                    </div>
                    <button className='w-full p-2 text-white bg-tertiary font-semibold text-[17px]'>Manage Your Orders</button>
                </div>
                <div className='bg-white border min-h-[400px] shadow-md flex flex-col '>
                    <h3 className='text-2xl font-semibold p-4'>List Globally</h3>
                    <div className='bg-slate-200 p-9 text-secondary text-lg'>
                        <p className=''>Get Help reaching millions of customers by listing internationally </p>
                    </div>
                    <img src={dashboard1} alt="Dashboard Image" className='bg-cover h-[180px] mb-[20px]' />
                    <button className='w-full p-2 text-white bg-tertiary font-semibold text-[17px]'>Manage International Listings</button>
                </div>
                <div className='bg-white border min-h-[400px] flex flex-col shadow-md'>
                    <div className='flex flex-row justify-between items-center px-5 text-secondary'>
                        <h3 className='text-2xl font-semibold p-4'>News</h3>
                        <DotsIcon size={22} />
                    </div>
                    <div className='flex flex-col mt-4 gap-y-2'>
                        <p className='flex flex-col px-8 max-w-[90%] py-1'>
                            <span className='text-gray-400'>Jul 08,2021</span>
                            <span className='font-medium text-lg text-secondary'>Payment Service Provider Program update</span>
                            <span className='text-input text-lg flex flex-row justify-start items-center gap-x-1 cursor-pointer'>Read more <ChevronRight size={15} /></span>
                        </p>
                        <p className='flex flex-col px-8  bg-slate-200 py-1'>
                            <span className='text-gray-400'>Jul 08,2021</span>
                            <span className='font-medium text-lg text-secondary'>Payment Service Provider Program update</span>
                            <span className='text-input text-lg flex flex-row justify-start items-center gap-x-1 cursor-pointer'>Read more <ChevronRight size={15} /></span>
                        </p>
                        <p className='flex flex-col px-8 max-w-[90%] py-1'>
                            <span className='text-gray-400'>Jul 08,2021</span>
                            <span className='font-medium text-lg text-secondary'>Payment Service Provider Program update</span>
                            <span className='text-input text-lg flex flex-row justify-start items-center gap-x-1 cursor-pointer'>Read more <ChevronRight size={15} /></span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='max-w-full grid lg:grid-cols-4 grid-cols-1 mt-10 gap-4'>
                <div className='overflow-hidden col-span-2 flex flex-col gap-y-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <h3 className='text-3xl font-semibold text-secondary'>Order History</h3>
                        <Link to={'/order-history'} className='flex flex-row text-lg items-center text-secondary gap-x-1 hover:underline' >{getCurrentMonthName()} Orders <ChevronRight /></Link>
                    </div>
                    <SalesHistoryTable salesHistory={salesHistory}  />
                </div>
                <div className='bg-white border min-h-[400px] flex flex-col shadow-md'>
                    <div className='flex flex-row justify-between items-center px-5 text-secondary'>
                        <h3 className='text-2xl font-semibold p-4'>Tutorials and Training</h3>
                        <DotsIcon size={22} />
                    </div>
                    <div className='flex flex-col mt-4 gap-y-2'>
                        <div className='bg-slate-200 p-9 text-secondary text-lg'>
                            <p className=''>Learn how to sell on amazon</p>
                        </div>
                        <img src={dashboard2} alt="Dashboard Image" className='bg-cover h-[180px] mb-[20px]' />
                        <button className='w-full p-2 text-white bg-tertiary font-semibold text-[17px]'>View Seller University</button>
                    </div>
                </div>
                <div className='bg-white border min-h-[400px] flex flex-col shadow-md'>
                    <div className='flex flex-row justify-between items-center px-5 text-secondary'>
                        <h3 className='text-2xl font-semibold p-4'>A-to-Z Claims</h3>
                        <DotsIcon size={22} />
                    </div>
                    <div className='flex flex-col mt-4 gap-y-2'>
                        <div className='bg-slate-200 p-9 text-secondary text-lg'>
                            <p className=''>You do not havy open A-to-Z Claims</p>
                        </div>
                        <div className='flex w-full justify-center items-center px-5 text-secondary py-12 flex-col gap-y-1'>
                            <span className='text-4xl font-semibold'>0</span>
                            <span className='text-secondary text-lg text-center'>You do no have any A-to-Z Claims that require attention</span>
                        </div>
                        <button className='w-full p-2 text-white bg-tertiary font-semibold text-[17px] mt-1'>Manage Your A-to-Z Claims</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
