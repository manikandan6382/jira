import React, { useEffect, useRef, useState } from 'react';
import AnimatedPassword from '../components/Register/AnimatedPassword';
import AuthCard from '../components/Register/AuthCard';
import InputField from '../components/Register/InputField';
import AnimatedCheckbox from '../components/Register/AnimatedCheckbox';
import { Ripple } from 'primereact/ripple';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <div className="bg-banner flex items-center justify-center">
                <AuthCard title="Create Your Account" className="">
                    <div className="flex flex-col gap-10 lg:flex-grow-0 flex-grow-1">
                        <InputField id="username" label="Username" icon="bi-person-fill" required className='form-control form-control-float' />
                        <AnimatedPassword label="Password" id="password" name="password" />
                        <div className="">
                            <div className="flex items-center justify-between flex-wrap gap-5">
                                <AnimatedCheckbox
                                    id="agree"
                                    label="Remember Me"
                                />
                                <Link to="/Forget_password" className="text-sm text-primary hover:underline font-bold">Forget password</Link>

                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="">
                                <button type="submit" className="btn-glass !rounded-[6px] !w-[100%]">
                                    <span className='glass-child !rounded-[6px]'>Submit</span>
                                    <Ripple />
                                </button>
                            </div>
                            <div className="flex items-center justify-between flex-wrap gap-5">
                                <span className="text-sm text-gray-300">Don't have an account?</span>
                                <Link to="/signup" className="text-sm text-primary hover:underline font-bold">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </AuthCard>
            </div>
        </>
    );
};

export default Login;