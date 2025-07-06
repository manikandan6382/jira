import React, { useRef } from 'react';
import logo from '../../assets/endless-logo.svg'
import logoIcon from '../../assets/logo-icon.svg'
import { useGsapFromTo } from '../gsap/useGsapFromTo';

const AuthCard = ({ title, children }) => {
    const authTitle = useRef(null);
    useGsapFromTo([
        {
        ref: authTitle,
        from: { opacity: 0, scale: 0.5 , y:50, },
        to:  { opacity: 1, scale: 1, y:0, duration: 3, ease: 'power3.out' },
      },
    ]);
    return (
            <form onSubmit={(e) => e.preventDefault()} className='lg:flex-grow-0 flex-grow-1 m-3 lg:m-0'>
                <div className="flex lg:items-center gap-10 lg:flex-1/2 flex-1/1 text-white login-card p-10 px-8 md:p-12 lg:p-16 rounded-[10px] scale-animation card-login flex-col-reverse lg:flex-row">

                    {/* LEFT CONTENT */}

                    {children}

                    {/* RIGHT CONTENT */}
                    <div className="flex-1 block">
                        <div className="mx-auto max-w-[400px] flex flex-col gap-8">
                            <div className="flex items-center justify-center">
                                <img src={logoIcon} alt="logo" className='h-[100px] md:h-[130px] aspect-[1.2/1] rotate-logo select-none' />
                            </div>
                            <p ref={authTitle} className="lg:text-[35px] text-[20px] font-bold text-center select-none">
                                Shape your projects. Empower your
                                <span id="shadow" className='mx-2 text-shadow-login'>
                                    <span id="glow" className="text-shadow-login_child">Team</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
    );
};

export default AuthCard;
