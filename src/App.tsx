import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Home from './screens/Home'
import Layout from './components/Layout'
import ProfitHistory from './screens/ProfitHistory'
import InvestmentHistory from './screens/InvestmentHistory'
import { useAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
    const { loggedIn } = useAuth()
    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route
                    path='/'
                    element={
                        loggedIn ? (
                            <Layout>
                                <Home />
                            </Layout>
                        ) : (
                            <Navigate to={'/signin'} />
                        )
                    }
                />
                <Route
                    path='/profit-history'
                    element={
                        loggedIn ? (
                            <Layout>
                                <ProfitHistory />
                            </Layout>
                        ) : (
                            <Navigate to={'/signin'} />
                        )
                    }
                />
                <Route
                    path='/investment-history'
                    element={
                        loggedIn ? (
                            <Layout>
                                <InvestmentHistory />
                            </Layout>
                        ) : (
                            <Navigate to={'/signin'} />
                        )
                    }
                />
                <Route path='/signin' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
