import React from 'react'

function Button({bgColor = "bg-gray-800", title = "Shop Now"}) {
  return (
    <button className={`${bgColor} text-white rounded-full px-4 py-2 flex items-center font-medium text-sm hover:cursor-pointer`}>
      {title}
      <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  )
}

export default Button