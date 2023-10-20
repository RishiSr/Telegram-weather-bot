import React from 'react'
import { Bars } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className="w-full my-auto flex flex-row justify-center " >
            <Bars
                height="50"
                width="50"
                color="#523880"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loading