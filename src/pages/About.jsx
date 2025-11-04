
import React from 'react';
import usePublicContent from '../hooks/usePublicContent';
import Loader from '../components/Loader'; // Assuming you have a Loader component

export default function About() {
  const { content, loading, error } = usePublicContent('/content/about', {
    title: 'About Us',
    description: '',
    imageUrl: '',
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:w-5/12 lg:w-5/12">
            {content.imageUrl && (
              <img
                src={content.imageUrl}
                alt="image"
                loading="lazy"
                className="rounded-lg shadow-lg"
              />
            )}
          </div>
          <div className="md:w-7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-6 text-gray-600 whitespace-pre-line">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
