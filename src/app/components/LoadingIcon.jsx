
export default function LoadingIcon() {
  return (
    <div className='h-screen flex justify-center items-center '>
      <div className='w-64 m-auto '>
        <div class="flex h-screen items-center justify-center">
          <div class="flex gap-2">
            <span class="h-4 w-4 animate-bounce rounded-full bg-[#9112BC] [animation-delay:0s]"></span>
            <span class="h-4 w-4 animate-bounce rounded-full bg-[#AE75DA] [animation-delay:0.1s]"></span>
            <span class="h-4 w-4 animate-bounce rounded-full bg-[#E9E294] [animation-delay:0.2s]"></span>
            <span class="h-4 w-4 animate-bounce rounded-full bg-[#FFFCB8] [animation-delay:0.3s]"></span>
            <span class="h-4 w-4 animate-bounce rounded-full bg-[#fff540] [animation-delay:0.3s]"></span>
          </div>
        </div>
      </div>
    </div>

  )
}
