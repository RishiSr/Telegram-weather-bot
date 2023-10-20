import React, { useEffect, useState } from 'react'
import BaseUrl from '../utils/BaseUrl';
import axios from 'axios';
import { successToast } from '../components/Toastify';

const Keys = () => {
    const [id, setId] = useState()
    const getKey = () => {
        axios.get(`${BaseUrl}/admin/api-key`).then((res) => {
            console.log(res)
            setId(res.data._id)
            setKeyVal(res.data.key);
            setnewKeyVal(res.data.key);

        }).catch((err) => {
            console.log(err);
            errorToast("Something went wrong")


        })
    }
    useEffect(() => {
        getKey();


    }, [])

    const updateKey = () => {
        axios.patch(`${BaseUrl}/admin/api-key`, {
            value: newkeyVal,
            id: id
        }).then((res) => {
            console.log(res)
            setKeyVal(newkeyVal);
            successToast("Api Key updated")
        }).catch((err) => {
            console.log(err);
            successToast("Api Key updated")

        })
    }

    const [newkeyVal, setnewKeyVal] = useState();
    const [keyVal, setKeyVal] = useState()
    return (
        <div className='flex flex-col h-full w-full  mt-32 place-items-center' >
            <div className='flex flex-col place-items-center gap-3 text-lg ' >

                <p className=' font-semibold '>
                    Update Api Key for the Weather API
                </p>

                <input value={newkeyVal} onChange={(e) => setnewKeyVal(e.target.value)} className='w-[30rem] h-16 border-2 rounded-xl text-lg px-2 outline-none border-purple ' />
                <div className='flex flex-row justify-around gap-4' >
                    <button disabled={(keyVal == newkeyVal) || ((newkeyVal?.length == 0)) || !newkeyVal} className='bg-white active:bg-light-purple rounded border text-purple border-purple px-3 py-2  disabled:cursor-not-allowed disabled:bg-gray-400 ' onClick={() => updateKey()}>
                        Update
                    </button>
                    <button className='bg-red-700 text-white active:bg-red-800 rounded border px-3 py-2' onClick={() => setnewKeyVal(keyVal)} >
                        Cancel
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Keys