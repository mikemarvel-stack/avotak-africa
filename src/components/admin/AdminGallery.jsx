import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminContent from '../../hooks/useAdminContent';

export default function AdminGallery() {
  const { gallery, loading, fetchGallery, addGalleryImage, deleteGalleryImage } = useAdminContent();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploading(true);
    try {
      await addGalleryImage(file);
      toast.success('Image uploaded successfully');
      fetchGallery();
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    
    try {
      await deleteGalleryImage(id);
      toast.success('Image deleted successfully');
      fetchGallery();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Gallery</h1>
        <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((image, index) => (
          <motion.div
            key={image._id || index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-lg overflow-hidden shadow-lg group"
          >
            <img
              src={image.url || image.imageUrl}
              alt={image.title || `Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => handleDelete(image._id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {gallery.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No images in gallery. Upload your first image!
        </div>
      )}
    </div>
  );
}
