import React, { ReactNode, useState } from 'react'
import SideBar from './SideBar'
import Navbar from './Navbar'

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <section className='w-full relative'>
            <SideBar open={open} />
            <div className='w-full overflow-auto min-h-screen flex flex-col relative'>
                <Navbar setOpen={setOpen} open={open} />
                {children}
                {open && (
                    <div
                        className='bg-black bg-opacity-55 h-full z-10 absolute top-0 left-0 w-full'
                        onClick={() => setOpen(false)}
                    ></div>
                )}
            </div>
        </section>
    )
}

export default Layout
