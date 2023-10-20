import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';
import { BiLogOut, BiUserCircle } from 'react-icons/bi';
import { BsTelegram } from 'react-icons/bs';
import { HiOutlineKey } from 'react-icons/hi';
import auth from '../utils/firebaseConfig';
import { signOut } from 'firebase/auth';

const SideBar = () => {
    const [open, setOpen] = useState(true)
    const [val, setVal] = useState(1);
    const navigate = useNavigate();
    const { setHeader, setAdminToken, setIsLoggedIn } = useContext(MyContext)
    return (
        <div className={`h-full ${open ? "w-64 -sm:w-[7rem]" : "-sm:w-[7rem] w-10"} bg-dark-purple  relative  `} >
            <div className='flex flex-col my-8 ml-2 -sm:hidden' >

                <p className='text-white text-3xl uppercase'>
                    Admin

                </p>
                <p className='text-white text-xl'>
                    Telegram Bot
                </p>
            </div>

            <BsTelegram className='sm:hidden text-white my-8 mx-auto text-4xl' />
            <div className='flex flex-col gap-5' >
                <div className={`${val == 1 ? "bg-white" : "bg-purple"} ${val == 1 ? "text-purple" : "text-white"} sm:pl-2  h-[3rem] mx-2 flex flex-row place-items-center justify-center rounded-lg `} onClick={() => { setVal(1); setHeader("Users Management"); navigate("./users"); }} >
                    <BiUserCircle className='text-3xl' />
                    <p className='flex-1 text-center font-semibold -sm:hidden' >

                        Users
                    </p>
                </div>
                <div className={`${val == 2 ? "bg-white" : "bg-purple"} ${val == 2 ? "text-purple" : "text-white"} sm:pl-2  h-[3rem] mx-2 flex flex-row place-items-center justify-center rounded-lg `} onClick={() => { setVal(2); setHeader("Key Management"); navigate("./key") }}  >
                    <HiOutlineKey className='text-3xl ' />
                    <p className='flex-1 text-center font-semibold -sm:hidden ' >

                        Keys
                    </p>
                </div>

            </div>

            <button className='bg-red-700 active:bg-red-900 rounded  text-white  sm:px-4 py-2 absolute bottom-10 left-1/2 -translate-x-1/2' onClick={async () => { await signOut(auth); setAdminToken(null); localStorage.removeItem("adminToken"), setIsLoggedIn(false), navigate("../") }} >
                <p className='-sm:hidden'>
                    Log Out
                </p>
                <BiLogOut className='sm:hidden text-3xl text-white' />
            </button>

        </div>
    )
}

export default SideBar