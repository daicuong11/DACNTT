const CartItemSkeleton = () => {
  return (
    <div className='max-w-[600px] relative px-3 py-4 pl-8 shadow-sm border rounded-lg bg-white min-h-10 animate-pulse'>
      {/* Checkbox Skeleton */}
      <div className='absolute w-5 h-5 bg-gray-200 rounded left-3 top-4'></div>

      {/* Remove Button Skeleton */}
      <div className='absolute w-6 h-6 bg-gray-200 rounded right-2 top-4'></div>

      <div className='flex gap-x-4'>
        {/* Image Skeleton */}
        <div className='w-[100px] h-[100px] bg-gray-200 rounded'></div>

        <div className='flex flex-col w-full gap-y-2'>
          {/* Product Name Skeleton */}
          <div className='h-5 w-[70%] bg-gray-200 rounded'></div>

          <div className='flex flex-col justify-between w-full gap-2 sm:items-end sm:flex-row'>
            {/* Price Skeleton */}
            <div className='w-24 h-5 bg-gray-200 rounded'></div>

            {/* Quantity Control Skeleton */}
            <div className='flex gap-x-0.5 justify-end'>
              <div className='w-8 h-8 bg-gray-200 rounded'></div>
              <div className='w-8 h-8 bg-gray-200 rounded'></div>
              <div className='w-8 h-8 bg-gray-200 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItemSkeleton
