import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';

export default function AdminProduce() {
  const [produce, setProduce] = useState([]);
  const [editingProduce, setEditingProduce] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadProduce();
  }, []);

  const loadProduce = async () => {
    try {
      const data = await apiCall('/content/produce');
      setProduce(data);
    } catch (error) {
      console.error('Failed to load produce:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const produceData = {
      name: formData.get('name'),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl'),
      category: formData.get('category'),
      price: formData.get('price'),
      unit: formData.get('unit'),
      availability: formData.get('availability'),
      features: formData.get('features').split(',').map(f => f.trim()).filter(Boolean),
      order: parseInt(formData.get('order'), 10)
    };

    try {
      if (editingProduce) {
        await apiCall(`/content/produce/${editingProduce._id}`, 'PUT', produceData);
      } else {
        await apiCall('/content/produce', 'POST', produceData);
      }
      loadProduce();
      setEditingProduce(null);
    } catch (error) {
      console.error('Failed to save produce:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this produce item?')) return;
    try {
      await apiCall(`/content/produce/${id}`, 'DELETE');
      loadProduce();
    } catch (error) {
      console.error('Failed to delete produce:', error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Produce</h1>
        <button
          onClick={() => setEditingProduce(null)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add New Produce
        </button>
      </div>

      {/* Edit/Add Form */}
      {(editingProduce !== null) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                defaultValue={editingProduce?.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                name="category"
                defaultValue={editingProduce?.category}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                defaultValue={editingProduce?.description}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                name="imageUrl"
                type="url"
                defaultValue={editingProduce?.imageUrl}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                name="price"
                defaultValue={editingProduce?.price}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="$XX.XX or Price on Request"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <input
                name="unit"
                defaultValue={editingProduce?.unit}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="kg, ton, piece, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Availability</label>
              <select
                name="availability"
                defaultValue={editingProduce?.availability}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Pre-order">Pre-order</option>
                <option value="Seasonal">Seasonal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Order</label>
              <input
                name="order"
                type="number"
                defaultValue={editingProduce?.order || 0}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
              <input
                name="features"
                defaultValue={editingProduce?.features?.join(', ')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Organic, Fresh, Export Quality"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setEditingProduce(null)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Produce List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produce.map(item => (
          <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-lg mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>Category: {item.category}</p>
              <p>Price: {item.price}</p>
              <p>Unit: {item.unit}</p>
              <p>Availability: {item.availability}</p>
            </div>
            {item.features?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-1">Features:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {item.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingProduce(item)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}