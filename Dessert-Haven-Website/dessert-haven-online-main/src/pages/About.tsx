
import React from 'react';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="cafe-container">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-cafe-chai mb-4">Our Story</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Bringing authentic Indian flavors and traditions to every sweet and savory bite.
            </p>
          </div>
          
          {/* Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1594640467849-7357b39910f7?q=80&w=640" 
                alt="Our cafe founder" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-cafe-chai mb-4">Where It All Began</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dessert Haven was born from a simple yet powerful desire: to share the rich, 
                authentic flavors of Indian sweets and snacks with our community.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2010 by the Sharma family, our cafe started as a small kitchen where 
                Grandma Sharma would prepare her legendary sweets for family gatherings. The recipes, 
                passed down through generations, soon became sought after by friends and neighbors.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                What began as a passion project quickly blossomed into a beloved local establishment, 
                where we continue to honor those traditional recipes while adding our own creative touch.
              </p>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="bg-cafe-cream dark:bg-cafe-cinnamon/40 rounded-lg p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cafe-chai mb-4">Our Values</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The principles that guide everything we do at Dessert Haven.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-cafe-spice mb-3">Authenticity</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We stay true to traditional recipes and techniques, using the finest quality ingredients 
                  to create authentic flavors that transport you to the streets of India.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-cafe-spice mb-3">Community</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our cafe is more than just a place to eat – it's a gathering space where people come together 
                  to share moments and create memories over delicious food.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-cafe-spice mb-3">Craftsmanship</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every dish is crafted with care and attention to detail, reflecting our commitment to 
                  excellence and our respect for the culinary traditions we represent.
                </p>
              </div>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cafe-chai mb-4">What Our Customers Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-cafe-cream dark:bg-cafe-cinnamon/30 p-6 rounded-lg">
                <p className="italic text-gray-700 dark:text-gray-200 mb-4">
                  "The gulab jamun here reminds me of my grandmother's cooking. Absolutely authentic and delicious!
                  I've been a regular customer for years and have never been disappointed."
                </p>
                <p className="font-bold text-cafe-chai">- Sarah J.</p>
              </div>
              <div className="bg-cafe-cream dark:bg-cafe-cinnamon/30 p-6 rounded-lg">
                <p className="italic text-gray-700 dark:text-gray-200 mb-4">
                  "I discovered Dessert Haven last year and it's become my go-to place for Indian sweets.
                  The samosas are crispy and flavorful, just like the ones I had in Delhi."
                </p>
                <p className="font-bold text-cafe-chai">- Michael T.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
