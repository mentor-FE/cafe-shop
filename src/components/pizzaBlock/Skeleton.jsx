// rafce

import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={578}
      viewBox='0 0 280 578'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}
    >
      <circle cx='132' cy='132' r='132' />
      <rect x='0' y='275' rx='0' ry='0' width='280' height='27' />
      <rect x='0' y='313' rx='0' ry='0' width='280' height='84' />
      <rect x='4' y='421' rx='5' ry='5' width='90' height='27' />
      <rect x='131' y='412' rx='24' ry='24' width='150' height='45' />
    </ContentLoader>
  )
}

export default Skeleton
