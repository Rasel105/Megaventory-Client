import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading/Loading';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const [sendEmailVerification] = useSendEmailVerification(auth);

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    if (user.providerData[0]?.providerId === "password" && !user.emailVerified) {
        return <div className='flex flex-col items-center my-10 border sm:w-full md:w-1/4 p-3  rounded shadow-2xl mx-auto'>
            <h3 className='text-3xl '>Please varify your email</h3>
            <h5 className='text-xl mt-3'>We've sent a varification email</h5>
            <h5 className='text-xl mt-3'>Check your email</h5>
            <button
                className='text-lg bg-green-500 px-3 py-2 rounded text-white mt-4'
                onClick={async () => {
                    await sendEmailVerification();
                    toast('Sent email');
                }}
            >
                Verify varification email again

            </button>
            <ToastContainer />
        </div>
    }
    return children;
};

export default RequireAuth;