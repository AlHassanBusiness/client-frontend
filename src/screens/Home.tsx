import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import ProfitHistoryTable from '../components/ProfitHistoryTable'
import { api } from '../api/api'
import { useEffect, useState } from 'react'

interface Store {
    _id: string
    name: string
}

interface ProfitHistory {
    _id: string
    amount: number
    createdAt: string
    store: Store
}

const Home = () => {
    const [firstStoreName, setFirstStoreName] =
        useState<string>('No Store Found')
    const [totalInvestment, setTotalInvestment] = useState<number>(0)
    const [profit, setProfit] = useState<number>(0)
    const [profitHistory, setProfitHistory] = useState<ProfitHistory[]>([])

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await api.get('/api/clientdashboard')
                if (response.status === 200) {
                    setProfit(response.data.profit)
                    setProfitHistory(response.data.profitHistory)
                    setTotalInvestment(response.data.totalInvestment)
                    setFirstStoreName(response.data.firstStoreName)
                }
            } catch (error) {
                console.log(error)
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
        <section className='flex flex-col min-h-screen mt-5 px-5'>
            <div className='flex flex-row justify-start items-center gap-4 flex-wrap w-full'>
                <div className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px]'>
                    <h4 className='md:text-xl text-[15px]'>
                        Active Investment
                    </h4>
                    <span className='md:text-2xl text-xl text-secondary font-extrabold'>
                        {totalInvestment ? `$${totalInvestment}` : '...'}
                    </span>
                </div>
                <div className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px]'>
                    <h4 className='md:text-xl text-[15px]'>
                        Profit of {getCurrentMonthName()}
                    </h4>
                    <span className='md:text-2xl text-xl text-secondary font-extrabold'>
                        {profit ? `${profit}` : '....'}
                    </span>
                </div>
                <div className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px]'>
                    <h4 className='md:text-xl text-[15px]'>Store</h4>
                    <span className='md:text-2xl text-xl text-secondary font-extrabold'>
                        {firstStoreName ? firstStoreName : '....'}
                    </span>
                </div>
                <Link
                    to={'/profit-history'}
                    className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px] cursor-pointer'
                >
                    <h4 className='md:text-xl text-[15px]'>Profit History</h4>
                    <span className='md:text-2xl text-xl text-secondary font-extrabold'>
                        ----
                    </span>
                </Link>
                <Link
                    to={'/investment-history'}
                    className='bg-white border border-gray-300 p-4 flex flex-col gap-y-3 md:min-w-[250px] w-[170px] cursor-pointer'
                >
                    <h4 className='md:text-xl text-[15px]'>
                        Investment History
                    </h4>
                    <span className='md:text-2xl text-xl text-secondary font-extrabold'>
                        ----
                    </span>
                </Link>
            </div>
            <div className='max-w-full flex flex-col mt-7 gap-2'>
                <div className='flex flex-row justify-between items-center'>
                    <h3 className='font-semibold md:text-xl text-lg'>
                        Profit History
                    </h3>
                    <Link
                        to={'/profit-history'}
                        className='text-sm cursor-pointer flex flex-row items-center justify-center gap-1'
                    >
                        See More
                        <FaChevronRight className='text-[10px]' />
                    </Link>
                </div>
                <ProfitHistoryTable profitHistory={profitHistory} />
            </div>
        </section>
    )
}

export default Home
