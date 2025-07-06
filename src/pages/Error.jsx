import React, { useRef } from 'react';
import { useGsapFromTo } from '../components/gsap/useGsapFromTo';
import { Link } from 'react-router-dom';
function Error() {

    const headingRef = useRef(null)
    const textRef = useRef(null)
    const descRef = useRef(null)

    useGsapFromTo([
        {
            ref: headingRef,
            from: { opacity: 0, scale: 0.5 },
            to: { opacity: 1, scale: 1, duration: 2, ease: 'power3.out' },
        },
        {
            ref: textRef,
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' },
        },
        {
            ref: descRef,
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power3.out' },
        }
    ]);

    return (
        <div className='bg-banner flex items-center justify-center text-white'>
            <div className="flex flex-col gap-6">
                <h4
                    id="shadow"
                    ref={headingRef}
                    className='mx-2 text-shadow-login text-7xl text-center select-none'
                >
                    <span id="glow" className="text-shadow-login_child font-bold">404</span>
                </h4>
                <p
                    ref={textRef}
                    className="lg:text-[35px] text-[25px] font-bold text-center select-none"
                >
                    Sorry, the page you're looking for cannot be found
                </p>
                <p
                    ref={descRef}
                    className="text-center font-medium"
                >
                    Please check the URL or return to the <Link to="/signup" className="text-primary hover:underline font-bold">Home Page</Link>

                </p>
            </div>
        </div>
    );
}

export default Error;