"use client"

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function loading() {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-64 m-auto '>
                <DotLottieReact
                    src="/public/imgs/loading.gif"
                    loop
                    autoplay />
            </div>
        </div>
    )
}
