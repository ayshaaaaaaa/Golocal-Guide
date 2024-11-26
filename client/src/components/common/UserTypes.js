import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Users, Building2 } from 'lucide-react';

const userTypes = [
  {
    title: 'Tourists',
    icon: Compass,
    description: 'Discover authentic local experiences and create unforgettable memories with trusted guides.',
    image: '/images/tourist1.jpg',
  },
  {
    title: 'Local Guides',
    icon: Users,
    description: 'Share your local expertise and earn while showing travelers the best of your city.',
    image: '/images/guide1.jpg',
  },
  {
    title: 'Business Owners',
    icon: Building2,
    description: 'Connect with travelers and grow your business by showcasing your services to a global audience.',
    image: '/images/business1.jpg',
  },
];

const UserTypes = () => {
  const [activeType, setActiveType] = useState(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Heading and User Types List */}
          <div className="space-y-8 md:space-y-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-700">
              Who It's For
            </h2>
            <div className="space-y-6 md:space-y-8">
              {userTypes.map((type, index) => (
                <motion.div
                  key={index}
                  className={`group flex items-center space-x-4 md:space-x-6 cursor-pointer py-3 px-4 md:py-4 md:px-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg ${
                    activeType === index ? 'bg-white shadow-lg' : ''
                  }`}
                  onClick={() => setActiveType(index)}
                  whileHover={{ x: 10 }}
                  initial={false}
                >
                  <motion.div
                    className={`p-2 md:p-3 rounded-full transition-colors duration-300 ${
                      activeType === index
                        ? 'bg-teal-50'
                        : 'bg-gray-50 group-hover:bg-teal-50'
                    }`}
                  >
                    <type.icon
                      className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                        activeType === index
                          ? 'text-emerald-500'
                          : 'text-gray-400 group-hover:text-emerald-500'
                      }`}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg md:text-xl font-medium transition-colors duration-300 ${
                        activeType === index
                          ? 'text-emerald-500'
                          : 'text-gray-500 group-hover:text-emerald-500'
                      }`}
                    >
                      {type.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{
                      x: activeType === index ? 0 : -10,
                      opacity: activeType === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight
                      className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                        activeType === index
                          ? 'text-emerald-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Image and Description */}
          <motion.div
            key={activeType}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg"
          >
            <motion.div
              layoutId="image-container"
              className="relative h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden"
            >
              <motion.img
                src={userTypes[activeType].image}
                alt={userTypes[activeType].title}
                className="w-full h-full object-cover"
                layoutId={`image-${activeType}`}
              />
            </motion.div>
            <motion.div
              className="p-6 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-base md:text-lg lg:text-xl text-gray-500 leading-relaxed">
                {userTypes[activeType].description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;