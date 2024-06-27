import React from 'react'

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

interface ProfitHistoryTableProps {
    profitHistory: ProfitHistory[]
}

const handleDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long', // Full month name
        day: '2-digit', // Two-digit day
        year: 'numeric', // Full year
    })

    return formattedDate
}

const ProfitHistoryTable: React.FC<ProfitHistoryTableProps> = ({
    profitHistory,
}) => {
    return (
        <div className='border border-gray-300 overflow-x-auto mb-5'>
            <table className='table-auto w-full text-left border-collapse'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='px-4 py-2 border border-gray-300'>
                            Profit Date
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Profit Amount
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Store
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {profitHistory.map((profit: ProfitHistory) => (
                        <tr key={profit._id}>
                            <td className='px-4 py-2 border border-gray-300 text-left'>
                                {handleDate(profit.createdAt)}
                            </td>
                            <td className='px-4 py-2 border border-gray-300 text-left'>
                                ${profit.amount}
                            </td>
                            <td className='px-4 py-2 border border-gray-300 text-left'>
                                {profit.store.name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProfitHistoryTable
