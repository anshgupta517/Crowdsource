import React from 'react'

const Image = ({src,alt,height,width,className}) => {
  return (
    <div className={`w-${width} h-${height}  ${className} rounded-lg overflow-hidden p-1`}>
        <img 
        loading='lazy'
        className={`w-full h-full bg-cover rounded-lg `}
        src={src} alt={alt} />
    </div>
  )
}

export default Image
