import React from 'react'

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

interface salesHistoryProps {
    salesHistory: SalesHistory[]
}

// const handleDate = (date: string) => {
//     const formattedDate = new Date(date).toLocaleDateString('en-US', {
//         month: 'long', // Full month name
//         day: '2-digit', // Two-digit day
//         year: 'numeric', // Full year
//     })

//     return formattedDate
// }

const SalesHistoryTable: React.FC<salesHistoryProps> = ({
    salesHistory,
}) => {
    return (
        <div className='border border-gray-300 overflow-x-auto mb-5'>
            <table className='table-auto w-full text-left border-collapse'>
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='px-4 py-2 border border-gray-300'>
                            Order No.
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Product
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Product Title 
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Sale Price
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {salesHistory.map((sale: SalesHistory,i: number) => (
                        <tr key={sale._id} className='border-b text-secondary'>
                            <td className='px-4 py-2  text-left'>
                                #{i+1}
                            </td>
                            <td className='px-4 py-2  text-left'>
                                <img src={sale.product.image} alt="Product Image" className='w-12 h-12 rounded-md' />
                            </td>
                            <td className='px-4 py-2  text-left'>
                                {sale.product.name}
                            </td>
                            <td className='px-4 py-2  text-left'>
                                ${sale.product.saleprice}
                            </td>
                            <td className='px-4 py-2  text-left'>
                                Delivered 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SalesHistoryTable
