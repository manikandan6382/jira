import React, { useEffect, useRef, useState } from 'react';
import AnimatedPassword from '../components/Register/AnimatedPassword';
import AuthCard from '../components/Register/AuthCard';
import InputField from '../components/Register/InputField';
import AnimatedCheckbox from '../components/Register/AnimatedCheckbox';
import { Ripple } from 'primereact/ripple';
import { Link } from 'react-router-dom';
const Signup = () => {
    return (
        <>

            <div className="bg-banner flex items-center justify-center">
                <AuthCard title="Create Your Account" className="">
                    <div className="flex flex-col gap-10 lg:flex-grow-0 flex-grow-1">
                        <InputField id="firstName" label="First Name" icon="bi-person-fill" required className='form-control form-control-float' />
                        <InputField id="lastName" label="Last Name" icon="bi-person-fill" required className='form-control form-control-float' />
                        <InputField id="email" label="Email" icon="bi-envelope-fill" required className='form-control form-control-float' />
                        <AnimatedPassword label="Password" id="password" name="password" />
                        <div className="flex flex-col gap-5">
                            <div className="">
                                <button type="submit" className="btn-glass !rounded-[6px] !w-[100%]">
                                    <span className='glass-child !rounded-[6px]'>Submit</span>
                                    <Ripple />
                                </button>
                            </div>
                            <div className="flex items-center justify-between flex-wrap gap-5">
                                <span className="text-sm text-gray-300">Already have an account?</span>
                                <Link to="/login" className="text-sm text-primary hover:underline font-bold">Sign In</Link>
                            </div>
                        </div>
                    </div>
                </AuthCard>
            </div>
        </>
    );
};

export default Signup;