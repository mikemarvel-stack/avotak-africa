import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Users, Target, Award, TrendingUp, Globe } from 'lucide-react';

export default function AboutUs() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    // Navigate to contact page
    navigate("/contact");
    // Scroll to top in case the page is long
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            About Avotak Africa Limited
          </h1>
          <p className="text-gray-700 text-lg">
            Pioneering agricultural solutions and fresh produce across East Africa since 2024
          </p>
        </div>

        {/* Who We Are */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Avotak Africa Limited is a pioneering agricultural company dedicated to delivering fresh produce and sustainable farming solutions across <strong>East Africa</strong>. Established in <strong>2024</strong>, we bridge the gap between local farmers and international markets, ensuring quality, sustainability, and fair trade practices.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We specialize in premium avocados, mangoes, herbs, and other high-value crops, providing comprehensive support from farm to market. Our commitment to excellence has made us a trusted partner for farmers and buyers alike.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-green-600" />
              <h2 className="text-xl font-semibold text-green-700">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To provide high-quality fruits, herbs, and agricultural consulting services that meet international standards, while empowering local farmers and contributing to food security across East Africa.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <h2 className="text-xl font-semibold text-green-700">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be East Africa's leading agricultural solutions provider, recognized for innovation, sustainability, and excellence. We envision a thriving agricultural sector where farmers prosper and communities flourish.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Leaf className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">Eco-friendly farming practices and responsible sourcing</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">Strict quality standards in every product and project</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Empowering local farmers and fostering growth</p>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">What We Do</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-6 h-6 text-green-600" />
                Fresh Produce Export
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We grow and supply premium quality produce to local and international markets:
              </p>
              <ul className="grid md:grid-cols-2 gap-2 text-gray-700 ml-4">
                <li>• Hass Avocados</li>
                <li>• Fresh Mangoes</li>
                <li>• Organic Basil</li>
                <li>• Fresh Ginger</li>
                <li>• Rosemary & Herbs</li>
                <li>• Vine Tomatoes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Agricultural Projects</h3>
              <ul className="text-gray-700 space-y-2">
                <li><strong>• Farmer Training Programs:</strong> Capacity building and modern farming techniques</li>
                <li><strong>• Export Facilitation:</strong> Streamlined processes and market access</li>
                <li><strong>• Sustainable Farming:</strong> Climate-smart agriculture and eco-friendly practices</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Consultancy Services</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Farm management and advisory</li>
                <li>• Post-harvest handling and quality control</li>
                <li>• Market linkages and export documentation</li>
                <li>• Supply chain optimization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you are a customer, partner, or farmer, join us in creating a greener, healthier, and more sustainable future. Together, we grow, innovate, and thrive.
          </p>
          <button
            onClick={handleContactClick}
            className="inline-block px-8 py-4 bg-white text-green-700 font-semibold rounded-md hover:bg-gray-100 transition shadow-lg"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </main>
  );
}
