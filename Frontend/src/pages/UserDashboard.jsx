import React from 'react';
import { Home, Leaf, ShoppingCart, Settings, LogOut } from 'lucide-react';

function UserDashboard() {
  return (
    <div className="flex h-screen bg-[#181a20]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e2329] text-white p-5 space-y-6">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li className="hover:bg-zinc-700 p-2 rounded cursor-pointer flex items-center gap-2">
              <Home size={20} /> Home
            </li>
            
            <li className="hover:bg-zinc-700 p-2 rounded cursor-pointer flex items-center gap-2">
              <ShoppingCart size={20} /> Orders
            </li>
            
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-[#1e2329] shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl text-white font-semibold">Username</h2>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <LogOut size={20} /> Logout
          </button>
        </header>

        {/* Content Area */}
        <main className="p-6">
          <div className="bg-[#1e2329] text-white border border-gray-700 rounded-xl shadow-lg p-8">
            <h3 className="text-lg font-semibold">Welcome!</h3>
            <p className="text-gray-400 font-semibold mt-2">Track your crops, manage orders, and stay updated.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
