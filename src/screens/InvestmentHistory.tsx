import InvestmentHistoryTable from '../components/InvestmentHistoryTable'
import { useState, useEffect } from 'react'
import { api } from '../api/api'

interface Store {
    _id: string
    name: string
}

interface InvestmentHistory {
    _id: string
    amount: number
    store: Store
    createdAt: string
    cumulativeAmount: string
}

const InvestmentHistory = () => {
    const [investmentHistory, setInvestmentHistory] = useState<
        InvestmentHistory[]
    >([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(
                    '/api/clientdashboard/investment-history',
                )
                if (response.status === 200) {
                    setInvestmentHistory(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <section className='flex flex-col min-h-screen mt-5 px-5'>
            <h3 className='font-semibold md:text-xl text-lg mb-4'>
                Investment History
            </h3>
            {!investmentHistory.length ? (
                <p className='text-sm pl-5 font-semibold'>
                    No investment history
                </p>
            ) : (
                <InvestmentHistoryTable investmentHistory={investmentHistory} />
            )}
        </section>
    )
}

export default InvestmentHistory
