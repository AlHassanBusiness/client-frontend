import { useEffect, useState } from 'react'
import ProfitHistoryTable from '../components/ProfitHistoryTable'
import { api } from '../api/api'

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

const ProfitHistory = () => {
    const [ProfitHistory, setProfitHistory] = useState<ProfitHistory[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(
                    'api/clientdashboard/profit-history',
                )
                if (response.status === 200) {
                    setProfitHistory(response.data.data)
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
                Profit History
            </h3>
            <ProfitHistoryTable profitHistory={ProfitHistory} />
        </section>
    )
}

export default ProfitHistory
