import React from "react";

export default function AboutUs() {
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
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Avotak Africa Limited is a pioneering agricultural company dedicated to delivering fresh produce and sustainable farming solutions across <strong>East Africa</strong>. Established in <strong>2024</strong>, our vision has always been to promote healthy living while supporting local farmers and communities.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-2">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide high-quality fruits, herbs, and agricultural consulting services that meet international standards, while empowering local farmers and contributing to food security.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-2">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be a leading agricultural solutions provider recognized for innovation, sustainability, and excellence in service delivery. We envision a world where fresh, safe, and nutritious produce is accessible to all.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Core Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Sustainability:</strong> We prioritize eco-friendly farming practices and responsible sourcing.</li>
            <li><strong>Quality:</strong> Every product and project we deliver meets strict quality standards.</li>
            <li><strong>Community:</strong> We work closely with local farmers and communities to foster growth.</li>
            <li><strong>Innovation:</strong> We implement modern agricultural technologies and techniques.</li>
            <li><strong>Integrity:</strong> We conduct our business transparently and ethically.</li>
          </ul>
        </div>

        {/* What We Do */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">What We Do</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Fresh Produce</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              We grow and supply a variety of high-quality fruits and herbs, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Lemons</li>
              <li>Basil</li>
              <li>Mangoes</li>
              <li>[Other produce…]</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Agricultural Projects</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li><strong>Community Farming Initiatives:</strong> Empowering local farmers with training and resources.</li>
              <li><strong>Organic Farming Projects:</strong> Promoting pesticide-free and eco-friendly practices.</li>
              <li><strong>Research & Innovation:</strong> Developing new crop varieties and farming techniques.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Consultancy Services</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Farm management advice</li>
              <li>Crop selection and planning</li>
              <li>Soil and water analysis</li>
              <li>Post-harvest handling guidance</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Join Our Journey</h2>
          <p className="text-gray-700 mb-6">
            Whether you are a customer, partner, or farmer, join us in creating a greener, healthier, and more sustainable future. Together, we grow, innovate, and thrive.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
