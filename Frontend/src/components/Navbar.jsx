import React, { useState } from 'react'
import { Search, ChevronDown, User, ShoppingCart } from 'lucide-react';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="w-full bg-zinc-700 border-b border-zinc-600 py-3 px-4 md:px-8 flex items-center justify-between flex-wrap gap-4">
      {/* Logo Section */}
      <div className="flex items-center space-x-6 order-first">
        <a 
          href="/" 
          className="font-bold text-2xl text-[#F0B90B] hover:text-orange-300 transition-colors"
        >
          AgreeVerse
        </a>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 min-w-[60%] md:min-w-0 md:max-w-2xl px-2 order-last md:order-none w-full md:w-auto">
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">Search</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            id="search-input"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 text-white pl-10 pr-4 bg-transparent border-2 border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F0B90B] focus:border-transparent placeholder:text-gray-400"
          />
        </div>
      </div>
      
      {/* Navigation Icons */}
      <div className="flex items-center space-x-5 md:space-x-7 order-last">
        <a 
          href="#" 
          className="flex flex-col items-center group hover:text-[#F0B90B] transition-colors"
        >
          <User 
            size={20} 
            className="text-gray-100 mb-1 group-hover:text-[#F0B90B] transition-colors" 
          />
          <span className="text-sm font-medium text-gray-100 group-hover:text-[#F0B90B] transition-colors">
            Login
          </span>
        </a>
        
        <a 
          href="#cart" 
          className="flex flex-col items-center group hover:text-[#F0B90B] transition-colors relative"
        >
          <ShoppingCart 
            size={20} 
            className="text-gray-100 mb-1 group-hover:text-[#F0B90B] transition-colors" 
          />
          <span className="text-sm font-medium text-gray-100 group-hover:text-[#F0B90B] transition-colors">
            Cart
          </span>
          {/* Cart Counter Badge */}
          <span className="absolute -top-1 -right-2 bg-[#F0B90B] text-white text-xs rounded-full h-4.5 w-4.5 flex items-center justify-center">
            2
          </span>
        </a>
      </div>
    </header>
  )
}

export default Navbar