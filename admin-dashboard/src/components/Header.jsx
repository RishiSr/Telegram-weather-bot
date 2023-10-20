import React, { useContext } from 'react'
import { MyContext } from '../MyContext'
import { BiSolidUserCircle } from 'react-icons/bi'

const Header = () => {

    const { header, name } = useContext(MyContext)
    return (
        <div className='w-full bg-white h-16  border-purple border-b-2 flex flex-row   place-items-center justify-between ' >
            <p className=' ml-10 uppercase font-semibold ' >
                {header}
            </p>
            <div className='mr-10 flex flex-row gap-2 place-items-center'>

                <BiSolidUserCircle className='text-2xl text-purple ' />
                <p className='text-purple -sm:hidden'>
                    {name}
                </p>
            </div>
        </div>
    )
}

export default Header