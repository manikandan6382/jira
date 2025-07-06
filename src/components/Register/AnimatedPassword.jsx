import React, { useEffect, useRef, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin, MorphSVGPlugin);

const BLINK_SPEED = 0.075;
const TOGGLE_SPEED = 0.125;
const ENCRYPT_SPEED = 1;

const AnimatedPassword = ({ label = "Password", id = "password", name = "password" }) => {
    const [passwordType, setPasswordType] = useState('password');
    const inputRef = useRef(null);
    const upperLidRef = useRef(null);
    const lowerLidRef = useRef(null);
    const eyeRef = useRef(null);
    const proxyRef = useRef(document.createElement('div'));
    const busyRef = useRef(false);
    const blinkTlRef = useRef(null);

    // Generate unique IDs for masks
    const uniqueId = useRef(`mask-${Math.random().toString(36).substr(2, 9)}`);

    const chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~,.<>?/;":][}{+_)(*&^%$#@!±=-§';

    useEffect(() => {
        const BLINK = () => {
            const delay = 3; // Fixed delay of 5 seconds
            const duration = BLINK_SPEED;
            const repeat = Math.random() > 0.5 ? 3 : 1;

            blinkTlRef.current = gsap.timeline({
                delay,
                onComplete: () => BLINK(), // Recursively call BLINK after completion
                repeat,
                yoyo: true,
            })
                .to(upperLidRef.current, {
                    morphSVG: lowerLidRef.current, // Use refs correctly
                    duration,
                })
                .to(`#${uniqueId.current}-eye-open path`, {
                    morphSVG: `#${uniqueId.current}-eye-closed path`, // Ensure the correct path is targeted
                    duration,
                }, 0);
        };

        BLINK(); // Start the blinking animation

        const MOVE_EYE = ({ x, y }) => {
            const posMapper = gsap.utils.mapRange(-100, 100, 30, -30);
            const BOUNDS = eyeRef.current.getBoundingClientRect();
            gsap.set(eyeRef.current, {
                xPercent: gsap.utils.clamp(-30, 30, posMapper(BOUNDS.x - x)),
                yPercent: gsap.utils.clamp(-30, 30, posMapper(BOUNDS.y - y)),
            });
        };

        window.addEventListener('pointermove', MOVE_EYE);

        return () => {
            window.removeEventListener('pointermove', MOVE_EYE);
            if (blinkTlRef.current) blinkTlRef.current.kill(); // Clean up the timeline
        };
    }, []);

    const handleToggle = () => {
        if (busyRef.current) return;
        const isPassword = passwordType === 'password';
        const val = inputRef.current.value;
        busyRef.current = true;

        const duration = TOGGLE_SPEED;

        if (isPassword) {
            if (blinkTlRef.current) blinkTlRef.current.kill();

            gsap.timeline({
                onComplete: () => {
                    busyRef.current = false;
                },
            })
                .to(upperLidRef.current, {
                    morphSVG: lowerLidRef.current,
                    duration,
                })
                .to(`#${uniqueId.current}-eye-open path`, {
                    morphSVG: `#${uniqueId.current}-eye-closed path`,
                    duration,
                }, 0)
                .to(proxyRef.current, {
                    duration: ENCRYPT_SPEED,
                    onStart: () => {
                        setPasswordType('text');
                    },
                    onComplete: () => {
                        proxyRef.current.innerHTML = '';
                        inputRef.current.value = val;
                    },
                    scrambleText: {
                        chars,
                        text: val.charAt(val.length - 1) === ' '
                            ? `${val.slice(0, val.length - 1)}${chars.charAt(
                                Math.floor(Math.random() * chars.length)
                            )}`
                            : val,
                    },
                    onUpdate: () => {
                        const len = val.length - proxyRef.current.innerText.length;
                        inputRef.current.value = `${proxyRef.current.innerText}${new Array(len).fill('•').join('')}`;
                    },
                }, 0);
        } else {
            gsap.timeline({
                onComplete: () => {
                    busyRef.current = false;
                },
            })
                .to(upperLidRef.current, {
                    morphSVG: upperLidRef.current,
                    duration,
                })
                .to(`#${uniqueId.current}-eye-open path`, {
                    morphSVG: `#${uniqueId.current}-eye-open path`,
                    duration,
                }, 0)
                .to(proxyRef.current, {
                    duration: ENCRYPT_SPEED,
                    onComplete: () => {
                        setPasswordType('password');
                        inputRef.current.value = val;
                        proxyRef.current.innerHTML = '';
                    },
                    scrambleText: {
                        chars,
                        text: new Array(inputRef.current.value.length).fill('•').join(''),
                    },
                    onUpdate: () => {
                        inputRef.current.value = `${proxyRef.current.innerText}${val.slice(
                            proxyRef.current.innerText.length,
                            val.length
                        )}`;
                    },
                }, 0);
        }
    };

    return (
        <div className="relative">
            <div className="flex gap-3 relative">
                <FloatLabel className=''>
                    <InputText id={id} type={passwordType} ref={inputRef} required className='form-control form-control-float' />
                    <label htmlFor={id} className='!text-white'>{label}</label>
                </FloatLabel>
                <button
                    type="button"
                    title="Reveal Password"
                    className='text-2xl absolute right-0 cursor-pointer'
                    aria-pressed={passwordType === 'text'}
                    onClick={handleToggle}
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <mask id={`${uniqueId.current}-eye-open`}>
                                <path
                                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12V20H12H1V12Z"
                                    fill="#D9D9D9"
                                    stroke="black"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
                            </mask>
                            <mask id={`${uniqueId.current}-eye-closed`}>
                                <path
                                    d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12V20H12H1V12Z"
                                    fill="#D9D9D9"
                                />
                            </mask>
                        </defs>

                        <path
                            className="lid lid--upper"
                            ref={upperLidRef}
                            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            className="lid lid--lower"
                            ref={lowerLidRef}
                            d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        <g mask={`url(#${uniqueId.current}-eye-open)`}>
                            <g className="eye" ref={eyeRef}>
                                <circle cy="12" cx="12" r="4" fill="currentColor" />
                                <circle cy="11" cx="13" r="1" fill="black" />
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AnimatedPassword;