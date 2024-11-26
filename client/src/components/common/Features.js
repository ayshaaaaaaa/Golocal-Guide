import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Map, Star, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Safe & Reliable Tours",
      description: "Experience verified and secure local tours with trusted guides and guaranteed satisfaction."
    },
    {
      icon: <Map className="w-12 h-12" />,
      title: "Local Expertise",
      description: "Discover hidden gems and authentic experiences with knowledgeable local guides."
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Personalized Experience",
      description: "Get customized tours that match your interests and preferences perfectly."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community-Driven",
      description: "Join a thriving community of travelers, guides, and local businesses."
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-emerald-600 mb-16"
        >
          GoLocal Guide gives you the tools you need to explore and connect with local experiences.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-0 text-emerald-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

// // components/Features.js
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Map, Compass, Users, Star } from 'lucide-react';

// const features = [
//   { icon: Map, title: 'Discover Local Gems', description: 'Find hidden treasures and popular spots in every city.' },
//   { icon: Compass, title: 'Personalized Itineraries', description: 'Create custom travel plans tailored to your interests.' },
//   { icon: Users, title: 'Connect with Locals', description: 'Meet experienced guides for authentic experiences.' },
//   { icon: Star, title: 'Top-rated Experiences', description: 'Enjoy high-quality, vetted tourism services.' },
// ];

// const Features = () => {
//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Why Choose GoLocal Guide?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.2, duration: 0.8 }}
//               className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
//             >
//               <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
//               <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
//               <p className="text-blue-700">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;