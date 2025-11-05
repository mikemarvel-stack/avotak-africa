import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Users, Target, Award, TrendingUp, Globe, MapPin, CheckCircle, Heart, Shield, Lightbulb, Handshake } from 'lucide-react';

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
        <div className="text-center mb-16">
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Est. 2024 • East Africa
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            About Avotak Africa Limited
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Transforming African agriculture through innovation, sustainability, and farmer empowerment
          </p>
        </div>

        {/* Who We Are */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 md:p-12 mb-16 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-green-800">Who We Are</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            <strong className="text-green-700">Avotak Africa Limited</strong> is a dynamic agricultural enterprise headquartered in <strong>East Africa</strong>, dedicated to revolutionizing the agricultural value chain across the region. Founded in <strong>2024</strong>, we have quickly established ourselves as a trusted bridge between smallholder farmers and premium local and international markets.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Operating primarily in <strong>Kenya, Uganda, and Tanzania</strong>, we specialize in the production, aggregation, and export of high-value crops including premium Hass avocados, Kent and Apple mangoes, fresh herbs (basil, rosemary, coriander), and spices (ginger, turmeric). Our integrated approach combines modern agricultural practices with traditional farming knowledge to deliver exceptional quality produce.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Beyond produce supply, we are committed to <strong>farmer empowerment</strong> through comprehensive training programs, access to quality inputs, fair pricing, and direct market linkages. Our holistic model ensures that prosperity flows back to the farming communities that are the backbone of African agriculture.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To transform East African agriculture by providing premium quality produce, innovative farming solutions, and comprehensive support services that meet international standards—while empowering smallholder farmers, promoting sustainable practices, and contributing to regional food security and economic prosperity.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To be East Africa's most trusted and innovative agricultural solutions provider by 2030—recognized for excellence in quality, sustainability, and farmer empowerment. We envision thriving farming communities, flourishing ecosystems, and a resilient agricultural sector that feeds Africa and the world.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-green-800">Sustainability</h3>
              <p className="text-gray-600">Climate-smart agriculture, water conservation, and eco-friendly practices that protect our environment for future generations</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-green-800">Excellence</h3>
              <p className="text-gray-600">Uncompromising quality standards, rigorous testing, and continuous improvement in every product and service we deliver</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-green-800">Farmer First</h3>
              <p className="text-gray-600">Empowering smallholder farmers through fair pricing, training, and market access—because their success is our success</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-green-800">Integrity</h3>
              <p className="text-gray-600">Transparent operations, ethical business practices, and honest relationships with all our stakeholders</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-green-800">Innovation</h3>
              <p className="text-gray-600">Embracing technology, modern techniques, and creative solutions to solve agricultural challenges</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Handshake className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-green-800">Partnership</h3>
              <p className="text-gray-600">Building lasting relationships based on trust, mutual benefit, and shared commitment to agricultural excellence</p>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">What We Do</h2>

          <div className="space-y-10">
            <div className="border-l-4 border-green-600 pl-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-green-800">
                <Globe className="w-7 h-7 text-green-600" />
                Premium Produce Supply & Export
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We cultivate, aggregate, and export premium quality fresh produce to discerning buyers across East Africa, Europe, Middle East, and Asia. Our products meet international food safety standards (GlobalGAP, HACCP) and are traceable from farm to fork.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Fruits</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>✓ Hass Avocados</li>
                    <li>✓ Kent & Apple Mangoes</li>
                    <li>✓ Passion Fruits</li>
                    <li>✓ Bananas</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Herbs & Vegetables</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>✓ Fresh Basil</li>
                    <li>✓ Rosemary & Coriander</li>
                    <li>✓ Cherry Tomatoes</li>
                    <li>✓ Leafy Greens</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Spices</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>✓ Fresh Ginger</li>
                    <li>✓ Turmeric</li>
                    <li>✓ Chili Peppers</li>
                    <li>✓ Garlic</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-600 pl-6">
              <h3 className="text-2xl font-bold mb-4 text-green-800">Agricultural Consultancy Services</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Our team of experienced agronomists and agricultural specialists provide end-to-end support to farmers, cooperatives, and agribusinesses across East Africa.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Farm Advisory & Planning</h4>
                    <p className="text-gray-600 text-sm">Soil analysis, crop selection, farm design, and production planning</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Quality Management</h4>
                    <p className="text-gray-600 text-sm">Post-harvest handling, grading, packaging, and cold chain management</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Market Linkages</h4>
                    <p className="text-gray-600 text-sm">Connecting farmers to premium buyers, contract negotiation, export facilitation</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Certification Support</h4>
                    <p className="text-gray-600 text-sm">GlobalGAP, organic, fair trade, and other international certifications</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-600 pl-6">
              <h3 className="text-2xl font-bold mb-4 text-green-800">Farmer Training & Capacity Building</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We invest in farmer education through hands-on training programs, demonstration farms, and farmer field schools covering modern agricultural practices, business skills, and market access.
              </p>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Technical Training</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Good Agricultural Practices (GAP)</li>
                      <li>• Integrated Pest Management (IPM)</li>
                      <li>• Water-efficient irrigation</li>
                      <li>• Organic farming methods</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Business Skills</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Financial literacy & record keeping</li>
                      <li>• Group dynamics & cooperatives</li>
                      <li>• Market intelligence</li>
                      <li>• Entrepreneurship development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 md:p-12 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-green-100">Farmers Supported</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-green-100">Hectares Under Management</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-green-100">Export Destinations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">40%</div>
              <div className="text-green-100">Average Income Increase</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-xl shadow-2xl p-12 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner With Us</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Whether you're a farmer seeking market access, a buyer looking for premium African produce, or an organization interested in agricultural development—we invite you to join us in transforming East African agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContactClick}
              className="inline-block px-8 py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get In Touch
            </button>
            <button
              onClick={() => navigate('/services')}
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-green-700 transition shadow-lg"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
