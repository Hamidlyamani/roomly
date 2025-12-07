"use client"

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function loading() {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-64 m-auto '>
                <DotLottieReact
                    src="https://lottie.host/77b06eea-a4c5-419f-84e7-09ccb9d27693/3VakguY68r.lottie"
                    loop
                    autoplay />
            </div>
        </div>
    )
}
