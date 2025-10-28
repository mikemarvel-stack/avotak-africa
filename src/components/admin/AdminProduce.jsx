import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import ImageUpload from './ImageUpload';

export default function AdminProduce() {
  const [produce, setProduce] = useState([]);
  const [editingProduce, setEditingProduce] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadProduce();
  }, []);

  const loadProduce = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/content/produce');
      setProduce(data);
    } catch (err) {
      console.error('Failed to load produce:', err);
      setError('Failed to load produce items.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingProduce(null);
    setIsFormVisible(true);
    setError(null);
  };

  const handleEdit = (item) => {
    setEditingProduce(item);
    setIsFormVisible(true);
    setError(null);
  };

  const handleCancel = () => {
    setEditingProduce(null);
    setIsFormVisible(false);
    setError(null);
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
      order: parseInt(formData.get('order'), 10) || 0,
    };

    try {
      if (editingProduce) {
        await apiCall(`/content/produce/${editingProduce._id}`, 'PUT', produceData);
      } else {
        await apiCall('/content/produce', 'POST', produceData);
      }
      await loadProduce();
      handleCancel();
    } catch (err) {
      console.error('Failed to save produce:', err);
      setError('Failed to save produce. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this produce item?')) return;
    try {
      await apiCall(`/content/produce/${id}`, 'DELETE');
      await loadProduce();
    } catch (err) {
      console.error('Failed to delete produce:', err);
      setError('Failed to delete produce. Please try again.');
    }
  };

  if (loading) return <div className="p-4">Loading produce...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Produce</h1>
        <button
          onClick={handleAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add New Produce
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      {/* Edit/Add Form */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingProduce ? 'Edit Produce' : 'Add New Produce'}</h2>
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

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <ImageUpload
                onImageUploaded={(url) => {
                  const input = document.querySelector('input[name="imageUrl"]');
                  if (input) input.value = url;
                }}
              />
              <input
                name="imageUrl"
                type="hidden"
                defaultValue={editingProduce?.imageUrl}
              />
              {editingProduce?.imageUrl && (
                <img
                  src={editingProduce.imageUrl}
                  alt="Current"
                  className="h-24 w-24 object-cover rounded mt-2"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                name="price"
                defaultValue={editingProduce?.price}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <input
                name="unit"
                defaultValue={editingProduce?.unit}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Availability</label>
              <select
                name="availability"
                defaultValue={editingProduce?.availability || 'In Stock'}
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
              onClick={handleCancel}
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
                onClick={() => handleEdit(item)}
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
