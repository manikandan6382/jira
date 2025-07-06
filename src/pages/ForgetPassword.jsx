import React, { useEffect, useRef, useState } from 'react';
import AnimatedPassword from '../components/Register/AnimatedPassword';
import AuthCard from '../components/Register/AuthCard';
import InputField from '../components/Register/InputField';
import AnimatedCheckbox from '../components/Register/AnimatedCheckbox';
import { Ripple } from 'primereact/ripple';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    return (
        <>
            <div className="bg-banner flex items-center justify-center">
                <AuthCard title="Create Your Account" className="">
                    <div className="flex flex-col gap-10 lg:flex-grow-0 flex-grow-1">
                        <p class="lg:text-[30px] text-[25px] font-bold select-none max-w-[400px]">Forgot password?</p>

                        <InputField id="email" label="Email" icon="bi-envelope-fill" required className='form-control form-control-float' />

                        <div className="flex flex-col gap-5">
                            <div className="">
                                <button type="submit" className="btn-glass !rounded-[6px] !w-[100%]">
                                    <span className='glass-child !rounded-[6px] !capitalize'>Send reset link</span>
                                    <Ripple />
                                </button>
                            </div>
                            <div className="flex items-center justify-between flex-wrap gap-5">
                                <span className="text-sm text-gray-300">Return to</span>
                                <Link to="/login" className="text-sm text-primary hover:underline font-bold">Sign In</Link>
                            </div>
                        </div>
                    </div>
                </AuthCard>
            </div>
        </>
    );
};

export default ForgetPassword;