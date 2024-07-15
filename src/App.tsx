import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Home from './screens/Home'
import Layout from './components/Layout'
import ProfitHistory from './screens/ProfitHistory'
import InvestmentHistory from './screens/InvestmentHistory'
import Profile from './screens/Profile'
import SalesHistory from './screens/SalesHistory'
import { useAuth } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import Loader from './components/Loader'

const App = () => {
    const { loggedIn,loading } = useAuth()

    if(loading){
        return (
            <div className='flex justify-center items-center min-h-screen'>
                 <Loader width='60' height='60' />
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                {
                    loggedIn ? 
                    (
                        <>
                    <Route
                        path='/'
                        element={
                                <Layout>
                                    <Home />
                                </Layout>
                        }
                    />
                    <Route
                        path='/profit-history'
                        element={
                                <Layout>
                                    <ProfitHistory />
                                </Layout>
                        }
                    />
                    <Route
                        path='/investment-history'
                        element={
                            
                                <Layout>
                                    <InvestmentHistory />
                                </Layout>
                        }
                    />
                    <Route
                        path='/profile'
                        element={
                                <Layout>
                                    <Profile />
                                </Layout>
                        }
                    />
                    <Route
                        path='/order-history'
                        element={
                            
                                <Layout>
                                    <SalesHistory />
                                </Layout>
                        }
                    />
                    <Route
                        path='*'
                        element={
                            
                                <Layout>
                                    <Home />
                                </Layout>
                        }
                    />
                        </>
                    ) : 
                    <>
                        <Route path='/signin' element={<Login />} />
                        <Route path='*' element={<Login />} />
                    </>
                }
            </Routes>
        </BrowserRouter>
    )
}

export default App
