import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContext'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import auth from '../utils/firebaseConfig';

const Homescreen = () => {
    const navigate = useNavigate();
    const { setName, setAdminToken, name, adminToken, setIsLoggedIn } = useContext(MyContext);
    const [msg, setMsg] = useState(null)
    const SignupComponent = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);

                setName(user.providerData[0].displayName),
                    setAdminToken(user.stsTokenManager.accessToken)
                setIsLoggedIn(true)
                localStorage.setItem("adminToken", user.stsTokenManager.accessToken)
                navigate("./home/users");


                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                return null;
                // ...
            });



    }


    return (
        <div className=' w-screen h-screen bg-cover flex flex-col place-items-center justify-center   ' style={{
            backgroundImage: "url(/home.jpg)"
        }}
        >

            <div className=' h-[25rem] w-[30rem] rounded-xl p-4 flex-col flex bg-light-purple -sm:w-full  ' >
                <p className='text-3xl text-center uppercase font-semibold'>
                    Weather Telegram Bot
                </p>
                <p className='text-center text-lg mt-4 font-semibold' >
                    Admin Portal
                </p>
                <div className='flex-1 flex flex-col justify-center px-10'>

                    <button type="button" onClick={() => SignupComponent()} className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
                </div>
            </div>
        </div>
    )
}

export default Homescreen