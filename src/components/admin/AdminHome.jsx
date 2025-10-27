import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';

export default function AdminHome() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await apiCall('/content/home');
      setContent(data);
    } catch (error) {
      console.error('Failed to load home content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const updatedContent = {
      heroTitle: formData.get('heroTitle'),
      heroSubtitle: formData.get('heroSubtitle'),
      sliderImages: content?.sliderImages || [],
      sections: content?.sections || []
    };

    try {
      await apiCall('/content/home', 'PUT', updatedContent);
      loadContent();
    } catch (error) {
      console.error('Failed to update home content:', error);
    }
  };

  const handleAddSliderImage = () => {
    setContent(prev => ({
      ...prev,
      sliderImages: [...(prev.sliderImages || []), { url: '', caption: '' }]
    }));
  };

  const handleUpdateSliderImage = (index, field, value) => {
    const newSliderImages = [...content.sliderImages];
    newSliderImages[index] = { ...newSliderImages[index], [field]: value };
    setContent(prev => ({ ...prev, sliderImages: newSliderImages }));
  };

  const handleRemoveSliderImage = (index) => {
    setContent(prev => ({
      ...prev,
      sliderImages: prev.sliderImages.filter((_, i) => i !== index)
    }));
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Home Page</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Title</label>
              <input
                name="heroTitle"
                defaultValue={content?.heroTitle}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
              <textarea
                name="heroSubtitle"
                defaultValue={content?.heroSubtitle}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                rows="3"
                required
              />
            </div>
          </div>
        </div>

        {/* Slider Images */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Slider Images</h2>
            <button
              type="button"
              onClick={handleAddSliderImage}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Image
            </button>
          </div>
          
          <div className="space-y-4">
            {content?.sliderImages?.map((image, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-grow grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      type="url"
                      value={image.url}
                      onChange={(e) => handleUpdateSliderImage(index, 'url', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Caption</label>
                    <input
                      type="text"
                      value={image.caption}
                      onChange={(e) => handleUpdateSliderImage(index, 'caption', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSliderImage(index)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}