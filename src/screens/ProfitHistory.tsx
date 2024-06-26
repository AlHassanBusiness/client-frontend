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
    const [profitHistory, setProfitHistory] = useState<ProfitHistory[]>([])
    const [page, setPage] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [totalProfitHistory, setTotalProfitHistory] = useState<number>(0)
    const resultsPerPage = 20

    const getProfitHistory = async () => {
        setLoading(true)
        try {
            const response = await api.get(
                `/api/clientdashboard/profit-history?page=${page}`,
            )
            if (response.status === 200) {
                setProfitHistory(response.data.data)
                setTotalProfitHistory(response.data.total)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfitHistory()
    }, [page])

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if ((page + 1) * resultsPerPage < totalProfitHistory) {
            setPage(page + 1)
        }
    }

    return (
        <section className='flex flex-col min-h-screen mt-5 px-5'>
            <h3 className='font-semibold md:text-xl text-lg mb-4'>
                Profit History
            </h3>
            {loading && <div className='text-center mt-4'>Loading...</div>}
            {!loading && profitHistory.length > 0 ? (
                <>
                    <ProfitHistoryTable profitHistory={profitHistory} />
                    {totalProfitHistory > resultsPerPage && (
                        <div className='flex justify-center mt-10'>
                            <button
                                className='bg-primary text-white px-4 py-2 mx-2 rounded-md disabled:cursor-not-allowed'
                                onClick={handlePreviousPage}
                                disabled={page === 0 || loading}
                            >
                                Previous
                            </button>
                            <button
                                className='bg-primary text-white px-4 py-2 mx-2 rounded-md disabled:cursor-not-allowed'
                                onClick={handleNextPage}
                                disabled={
                                    (page + 1) * resultsPerPage >=
                                        totalProfitHistory || loading
                                }
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                !loading && (
                    <span className='font-light text-lg'>
                        No Profit History
                    </span>
                )
            )}
        </section>
    )
}

export default ProfitHistory
