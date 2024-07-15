import { useEffect, useState } from 'react'
import SalesHistoryTable from '../components/SalesHistoryTable'
import Loader from '../components/Loader'
import { api } from '../api/api'
import toast from 'react-hot-toast'


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


const SalesHistory = () => {

  const [salesHistory,setSalesHistory] = useState<SalesHistory[]>([])
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    const getSalesHistory = async() => {
      try {
        setLoading(true)
        const response = await api.get('/api/clientdashboard/salesHistory')
        if(response.status===200){
          setSalesHistory(response.data.data)
          setLoading(false)
        }
      } catch (error: any) {
        toast.error(error.response.data.error)
        setLoading(false)
      }
    }
    getSalesHistory()
  },[])


  return (
    <section className='flex flex-col min-h-screen mt-5 px-5'>
            <h3 className='font-semibold md:text-xl text-lg mb-4'>
                Order History 
            </h3>
            {loading && <Loader height='50' width='50'  />}
            {!loading && salesHistory.length > 0 ? (
                    <SalesHistoryTable salesHistory={salesHistory} />
            ) : (
                !loading && salesHistory.length === 0 &&  (
                    <span className='font-light text-lg'>
                        No Order History 
                    </span>
                )
            )}
        </section>
  )
}

export default SalesHistory