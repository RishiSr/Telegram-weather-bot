import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { ToastContainer } from 'react-toastify'

const HomeMng = () => {
    return (
        <div className='flex flex-row w-screen h-screen overflow-auto ' >
            <SideBar />
            <div className='flex flex-col h-full flex-1' >
                <Header />
                <div className='flex-1 h-full overflow-auto'>


                    <Outlet />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default HomeMng