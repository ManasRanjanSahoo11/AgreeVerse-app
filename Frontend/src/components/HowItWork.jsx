import React from 'react';
import { LayoutGrid, ShoppingCart, ShoppingBag } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <LayoutGrid/>
      ),
      title: "Open web app",
      description: "Choose groceries, fresh fruits, grain items & more"
    },
    {
      icon: (
       <ShoppingCart />
      ),
      title: "Place an order",
      description: "Order whatever you want from direct to the farmer"
    },
    {
      icon: (
        <ShoppingBag />
      ),
      title: "Get delivery",
      description: "Experience lighting-fast speed & get all your items delivered"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-44">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">How it Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-[#1e2329] text-white border border-gray-700 rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="mb-6">{step.icon}</div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-gray-400 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;