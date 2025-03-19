import React, { useState } from 'react';
import { Home, Sprout, LogOut, Plus, Edit, Trash2 } from 'lucide-react';

const CropCard = ({ title, description, imageURL, tag, price, createdAt, onEdit, onDelete }) => {
  return (
    <div className="bg-[#1e2329] text-white border border-gray-700 rounded-xl shadow-lg p-4 w-64">
      <img src={imageURL} alt={title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="bg-green-600 px-2 py-1 text-xs rounded">{tag}</span>
        <span className="text-yellow-400 font-bold">${price}</span>
      </div>
      <p className="text-gray-500 text-xs mt-2">Added: {new Date(createdAt).toLocaleDateString()}</p>
      <div className="flex justify-between mt-3">
        <button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1">
          <Edit size={16} /> Edit
        </button>
        <button onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1">
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

const CropModal = ({ isOpen, onClose, crop, onSave }) => {
  const [formData, setFormData] = useState(crop || { title: '', description: '', imageBase64: '', tag: '', price: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imageBase64: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-[#1e2329] p-6 rounded-lg shadow-lg w-96 text-white">
          <h2 className="text-xl font-semibold mb-4">{crop ? 'Edit Crop' : 'Add New Crop'}</h2>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full mb-2 p-2 bg-gray-800 rounded" />
          <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full mb-2 p-2 bg-gray-800 rounded" />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full mb-2 p-2 bg-gray-800 rounded" />
          <input name="tag" placeholder="Tag (vegetable, fruit, grain)" value={formData.tag} onChange={handleChange} className="w-full mb-2 p-2 bg-gray-800 rounded" />
          <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} className="w-full mb-2 p-2 bg-gray-800 rounded" />
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="bg-red-600 px-4 py-2 rounded">Cancel</button>
            <button onClick={() => onSave(formData)} className="bg-green-600 px-4 py-2 rounded">Save</button>
          </div>
        </div>
      </div>
    )
  );
};

function FarmerDashboard() {
  const [crops, setCrops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleEdit = (crop) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  const handleDelete = (crop) => {
    setCrops(crops.filter(c => c !== crop));
  };

  const handleSave = (crop) => {
    if (selectedCrop) {
      setCrops(crops.map(c => (c === selectedCrop ? crop : c)));
    } else {
      setCrops([...crops, { ...crop, createdAt: new Date() }]);
    }
    setIsModalOpen(false);
    setSelectedCrop(null);
  };

  return (
    <div className="flex h-screen bg-[#181a20]">
      <aside className="w-64 bg-[#1e2329] text-white p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
          <nav className="mt-5">
            <ul className="space-y-4">
              <li className="hover:text-orange-400 transition w-fit py-2 px-4 rounded cursor-pointer flex items-center gap-2">
                <Home size={20} /> Home
              </li>
              <li className="bg-zinc-700 p-2 rounded cursor-pointer flex items-center gap-2">
                <Sprout size={20} /> Crops
              </li>
            </ul>
          </nav>
        </div>
        <button className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-[#1e2329] shadow-md p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl text-white font-semibold">Username</h2>
            <p className="text-gray-400">Role: Farmer</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <Plus size={20} /> Add New Crop
          </button>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-2 gap-4 mt-6">
            {crops.map((crop, index) => (
              <CropCard key={index} {...crop} onEdit={() => handleEdit(crop)} onDelete={() => handleDelete(crop)} />
            ))}
          </div>
        </main>
      </div>
      <CropModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} crop={selectedCrop} onSave={handleSave} />
    </div>
  );
}

export default FarmerDashboard;