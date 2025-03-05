import React from 'react';

const ProductCard = ({imageUrl,productName, category, price }) => {
  return (
    <div className="w-full overflow-hidden max-w-[22vw] bg-[#1e2329] border rounded-lg shadow-sm border-gray-700">
      <img className="w-full h-[32vh] object-cover" src={imageUrl} alt={`${productName}`} />

      <div className="px-5 pb-5">
        <div>
          <h5 className="text-xl font-semibold py-2 text-white">{productName}</h5>
          <span className="inline-flex items-center px-2.5 py-1 bg-orange-400 text-white text-xs font-medium rounded-full">
            {category}
          </span>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{`$${price}`}</span>
          <button
            
            className="text-white bg-[#F0B90B] cursor-pointer font-medium rounded-lg text-sm px-5 py-2 text-center"
          >
            Purchese now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard