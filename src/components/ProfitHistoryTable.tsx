import React from 'react'

interface ProfitHistory {
    _id: string
    amount: number
    createdAt: string
}

interface ProfitHistoryTableProps {
    profitHistory: ProfitHistory[]
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
                            Active Investment
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {profitHistory.map((profit: ProfitHistory) => (
                        <tr key={profit._id}>
                            <td className='px-4 py-2 border border-gray-300 text-left'>
                                {new Date(
                                    profit.createdAt,
                                ).toLocaleDateString()}
                            </td>
                            <td className='px-4 py-2 border border-gray-300 text-left'>
                                ${profit.amount}
                            </td>
                            <td className='px-4 py-2 border border-gray-300 text-left'>
                                $16,101.18
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProfitHistoryTable
