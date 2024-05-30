import React from 'react'

interface Store {
    _id: string
    name: string
}

interface InvestmentHistory {
    _id: string
    amount: number
    store: Store
    createdAt: string
}

interface InvestmentHistoryProps {
    investmentHistory: InvestmentHistory[]
}

const InvestmentHistoryTable: React.FC<InvestmentHistoryProps> = ({
    investmentHistory,
}) => {
    return (
        <div className='border border-gray-300 overflow-x-auto mb-5'>
            <table className='table-auto w-full text-left border-collapse'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='px-4 py-2 border border-gray-300'>
                            Investment Date
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Invested Amount
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Total Investment
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {investmentHistory.map((investment: InvestmentHistory) => (
                        <tr key={investment._id}>
                            <td className='px-4 py-2 border border-gray-300 text-left'>
                                {new Date(
                                    investment.createdAt,
                                ).toLocaleDateString()}
                            </td>
                            <td className='px-4 py-2 border border-gray-300 text-left'>
                                ${investment.amount}
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

export default InvestmentHistoryTable
