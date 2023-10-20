import React, { useEffect, useState } from 'react'
import BaseUrl from '../utils/BaseUrl'
import axios from 'axios'
import { errorToast, successToast } from '../components/Toastify'
import Loading from '../components/Loading'

const Users = () => {
    const [users, setUsers] = useState(null)
    const fetchAllUsers = () => {
        axios.get(`${BaseUrl}/users/all`).then((res) => {
            console.log(res)
            setUsers(res.data)
        }).catch((err) => {
            errorToast("Something went wrong")
        })
    }
    const deleteUser = (id) => {
        axios.delete(`${BaseUrl}/users/${id}`).then((res) => {
            console.log(res)
            setUsers([...(users.filter((item) => {
                if (item.chatId != id) {
                    return item
                }
            }))]);
            successToast("User Deleted")
        }).catch((err) => {
            errorToast("Something went wrong")

        })
    }
    const update = (id, status, index) => {
        axios.patch(`${BaseUrl}/users`, {
            id,
            status
        }).then((res) => {
            console.log(res)
            setUsers([...(users.map((item, ind) => {
                if (ind == index) {
                    return { ...item, active: status };
                }
                else {
                    return item;
                }
            }))])
            successToast("User Status Updated")
        }).catch((err) => {
            errorToast("Something went wrong")

        })
    }
    useEffect(() => {
        fetchAllUsers();

    }, [])

    return (
        <div className='w-full ' >
            <div class="relative overflow-x-auto mt-10">
                <table class="w-full text-sm text-left text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Chat ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                City
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            users?.map((item, index) => {
                                return (
                                    <>
                                        <tr class="bg-white border-b ">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {item?.username}
                                            </th>
                                            <td class="px-6 py-4">
                                                {item?.chatId}
                                            </td>
                                            <td class="px-6 py-4">
                                                {item?.city}
                                            </td>
                                            <td class="px-6 py-4 flex flex-row gap-2">
                                                <button className='bg-white border rounded active:bg-light-purple border-purple px-4 py-2 text-purple' onClick={() => update(item._id, !item.active, index)} >
                                                    {item.active ? "Block" : "Unblock"}
                                                </button>
                                                <button className='px-4 py-2 bg-red-500 active:bg-red-700 text-white rounded' onClick={() => deleteUser(item.chatId)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </>

                                )
                            })
                        }


                    </tbody>
                </table>
                {
                    !users &&


                    <Loading />

                }
                {
                    users?.length == 0 && <p className='text-lg text-center mt-5 font-semibold' >
                        No users Found!!
                    </p>
                }


            </div>

        </div>
    )
}

export default Users