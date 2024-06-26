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
    const [page, setPage] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [totalInvestments, setTotalInvestments] = useState<number>(0)
    const resultsPerPage = 20

    const getInvestmentHistory = async () => {
        setLoading(true)
        try {
            const response = await api.get(
                `/api/clientdashboard/investment-history?page=${page}`,
            )
            if (response.status === 200) {
                setInvestmentHistory(response.data.data)
                setTotalInvestments(response.data.total)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getInvestmentHistory()
    }, [page])

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if ((page + 1) * resultsPerPage < totalInvestments) {
            setPage(page + 1)
        }
    }

    return (
        <section className='flex flex-col min-h-screen mt-5 px-5'>
            <h3 className='font-semibold md:text-xl text-lg mb-4'>
                Investment History
            </h3>
            {loading && <div className='text-center mt-4'>Loading...</div>}
            {!loading && !investmentHistory.length ? (
                <p className='text-sm underline font-semibold'>
                    No investment history
                </p>
            ) : (
                <InvestmentHistoryTable investmentHistory={investmentHistory} />
            )}
            {totalInvestments > resultsPerPage && (
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
                            (page + 1) * resultsPerPage >= totalInvestments ||
                            loading
                        }
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    )
}

export default InvestmentHistory
