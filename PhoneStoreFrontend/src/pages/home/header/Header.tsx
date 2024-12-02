const Header = () => {
  return (
    <div className='h-[136px] sticky top-0 z-10 w-full flex flex-col'>
      <div className='flex items-center justify-center gap-1'>
        <span className='relative flex w-3 h-3'>
          <span className='absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary'></span>
          <span className='relative inline-flex w-3 h-3 rounded-full bg-primary'></span>
        </span>
        Black Fire-Day 2024 - Săn sale bỏng tay!
      </div>
    </div>
  )
}

export default Header
