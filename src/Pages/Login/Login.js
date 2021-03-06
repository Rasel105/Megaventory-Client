import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import SocialLogIn from '../Shared/SocialLogIn/SocialLogIn';
import loginImage from '../../images/formImages/login.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fade from 'react-reveal/Fade';
import { AiOutlineLogin } from 'react-icons/ai';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef('');

    const from = location.state?.from?.pathname || '/';
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    // console.log(error);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (loading || sending) {
        return <Loading />
    };



    const handleLogin = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password)
        await signInWithEmailAndPassword(email, password);

        const { data } = await axios.post('https://thawing-everglades-09724.herokuapp.com/login', { email })

        localStorage.setItem('accessToken', data.accessToken);
        navigate(from, { replace: true });
    };

    const resetPassword = () => {
        const email = emailRef.current.value;

        if (email) {
            sendPasswordResetEmail(email);
            toast.error('Please, Check your email.', {
                toastId: 'success1',
            });
        }
        else {
            toast.error('Please, provide your forgot email', {
                toastId: 'success1',
            });
        }
    };

    if (user) {
        // navigate(from, { replace: true });
        toast.success('Login successfull', {
            toastId: 'success1',
        });
    }

    // let errorTag;
    switch (error?.code) {
        default:
            // error.message = 'Internal Error'
            break;
        case 'auth/user-not-found':
            toast.error('Use not found', {
                toastId: 'success1',
            });
            break;
        case 'auth/email-already-exists':
            toast.error('Email already exists', {
                toastId: 'success1',
            });
            break;
        case 'auth/invalid-email':
            toast.error('Invalid email', {
                toastId: 'success1',
            });
            break;
        case 'auth/wrong-password':
            toast.error('wrong-password', {
                toastId: 'success1',
            });
            break;
    };


    return (
        <div className="container mx-auto min-h-screen">
            <Fade left>
                <div className="flex justify-center px-6 my-2">
                    <div className="w-full xl:w-3/4 lg:w-7 flex">
                        <div className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
                            <img src={loginImage} alt="" />
                        </div>
                        <div className="w-full lg:w-1/2 bg-gray-50 p-5 shadow-2xl rounded-lg lg:rounded-l-none">
                            <h3 className="mb-2 text-2xl text-center">Welcome Back!</h3>
                            <form onSubmit={handleLogin} className="px-8 pt-3 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                                        Email <span className='text-red-600'>*</span>
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        name="email"
                                        ref={emailRef}
                                        type="email"
                                        required
                                        placeholder="Your email"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Password <span className='text-red-600'>*</span>
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="******************"
                                    />
                                </div>
                                <div className="mb-7 flex justify-between">
                                    <div>
                                        <input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                                        <label className="text-sm">
                                            Remember Me
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            onClick={resetPassword}
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-3 text-center">
                                    {/* <p className='text-red-700 mb-2'>{error?.message}</p> */}
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-green-400 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Login <AiOutlineLogin className='ml-0 inline-block' size={20} />
                                    </button>
                                </div>
                                <div className='flex items-center justify-center my-2'>
                                    <div className='border-2 w-1/2'></div>
                                    <p className='text-center mx-2'>or</p>
                                    <div className='border-2 w-1/2'></div>
                                </div>

                                {/* <div className="text-center mb-3">
                                <button
                                    className="w-full flex justify-evenly items-center px-4 py-2 font-bold text-black rounded-full border-2 bg-white focus:outline-none focus:shadow-outline"
                                    type="button">
                                    <img className='inline' style={{ width: '25px' }} src={google} alt="" />
                                    <span className='text-center'>Continue with google</span>
                                </button>
                            </div> */}
                                <SocialLogIn />

                                <div className="mb-2 text-center">
                                    <Link to="/signup"
                                        className="w-full px-4 py-2 font-bold text-white bg-green-400 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Create an Account
                                    </Link>
                                </div>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    )
};

export default Login;