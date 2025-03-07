import React from 'react'
import Button from './Button'

function Card({bgColor = "bg-orange-200", title, cropImage}) {
  return (
    <div className={`relative w-full max-w-sm rounded-lg overflow-hidden ${bgColor} px-3 flex items-center`}>
      
      {/* Content Container */}
      <div className="relative z-10 flex-1">
        {/* Title and Description */}
        <div className="mb-2">
          <div className="flex items-center">
            <h3 className="text-green-700 font-medium text-md">Fresh & Healthy</h3>
            <svg className="h-4 w-4 ml-1 text-green-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 001.06 0l6.5-6.5a.75.75 0 000-1.06l-6.5-6.5a.75.75 0 00-1.06 1.06L12.94 4.5l-5.973 5.973a.75.75 0 001.06 1.06z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-green-600 font-bold text-2xl pb-3 uppercase tracking-wide">{title}</h2>
        </div>

       <Button/>
       
      </div>

      {/* Vegetable Basket Image */}
      <div className="relative z-10 ml-4">
        <img 
          src={`${cropImage}`} 
          alt="Image" 
          className="h-44 w-44 object-contain"
        />
      </div>
    </div>
  )
}

export default Card