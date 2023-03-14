import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


const SkeletonVideo = () => {
  return (
    <div className='flex flex-col flex-wrap'>
      <div className='m-5'>      
    <SkeletonTheme color="#343a40" highlightColor='#3c4147' >
        <Skeleton height={150} width={270}   />
        <Skeleton height={10} count={2} />
      </SkeletonTheme>
      </div>

    </div>
  )
}

export default SkeletonVideo