import React, { useEffect, useState } from 'react'
import { api } from '../api/api'

interface Details {
    _id: string
    name: string
    email: string
    phone: string
    address: string
    bankname: string
    accountno: string
    accountholdername: string
}

const Profile: React.FC = () => {
    const [details, setDetails] = useState({} as Details)

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await api.get(
                    '/api/clientdashboard/profile-details',
                )
                if (response.status === 200) {
                    setDetails(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getDetails()
    }, [])

    return (
        <div className='lg:min-w-[85%] w-[97%] mx-auto p-4 bg-white rounded-lg my-5'>
            <h1 className='text-2xl font-semibold mb-4'>Profile Details</h1>
            <div className='mb-6 bg-slate-200 p-4 shadow-md'>
                <h2 className='text-lg font-medium mb-2'>{details.name}</h2>
                <span className='text-gray-600 text-sm'>Account holder</span>
            </div>

            <div className='mb-4 shadow-md p-4'>
                <h3 className='text-xl font-medium mb-3'>Contact Details</h3>
                <div className='flex justify-between items-center border-b p-2 rounded-md'>
                    <span className='font-semibold md:text-md text-sm'>
                        Mobile number
                    </span>
                    <button className='text-blue-500 md:text-md text-sm'>
                        {details.phone}
                    </button>
                </div>
                <div className='flex justify-between items-center border-b p-2 rounded-md'>
                    <span className='font-semibold md:text-md text-sm'>
                        Email
                    </span>
                    <button className='text-blue-500 md:text-md text-sm'>
                        {details.email}
                    </button>
                </div>
                <div className='flex justify-between items-center border-b p-2 rounded-md'>
                    <span className='font-semibold md:text-md text-sm'>
                        Address
                    </span>
                    <button className='text-blue-500 md:text-md text-sm'>
                        {details.address}
                    </button>
                </div>
            </div>

            <div className='mb-4 shadow-md p-4'>
                <h3 className='text-xl font-medium mb-2'>Bank Details</h3>
                <div className='flex justify-between items-center border-b p-2 rounded-md'>
                    <span className='font-semibold md:text-md text-sm'>
                        Account Holder Name
                    </span>
                    <button className='text-blue-500 md:text-md text-sm'>
                        {' '}
                        {details.accountholdername}{' '}
                    </button>
                </div>
                <div className='flex justify-between items-center border-b p-2 rounded-md'>
                    <span className='font-semibold md:text-md text-sm'>
                        Account No.
                    </span>
                    <button className='text-blue-500 md:text-md text-sm'>
                        {details.accountno}
                    </button>
                </div>
                <div className='flex justify-between items-center border-b p-2 rounded-md'>
                    <span className='font-semibold md:text-md text-sm'>
                        Bank Name
                    </span>
                    <button className='text-blue-500 md:text-md text-sm'>
                        {' '}
                        {details.bankname}{' '}
                    </button>
                </div>
            </div>

            <div className='text-gray-600 text-sm'>
                The account holder's profile cannot be removed.
            </div>
        </div>
    )
}

export default Profile
