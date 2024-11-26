import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-4">
            Ready to start your journey?
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-8">
            Join GoLocal Guide today.
          </h3>

          {/* Buttons Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center items-center">
            {/* Register Your Business Button */}
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/signup"
              //   className="block text-center bg-white text-emerald-600 border-2 border-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-emerald-600 hover:text-white transition-colors"
              // >
                className="block text-center bg-emerald-600 text-white border-2 border-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Register Your Business
              </Link>
            </motion.div> */}

            {/* Sign up as Tourist Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/signup"
                className="block text-center bg-white text-emerald-600 border-2 border-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-emerald-600 hover:text-white transition-colors"
              >
                {/* className="block text-center bg-emerald-600 text-white border-2 border-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-white hover:text-emerald-600 transition-colors"
              > */}
                Sign up as Tourist
              </Link>
            </motion.div>

            {/* Become a Guide Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/signup"
              //   className="block text-center bg-white text-emerald-600 border-2 border-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-emerald-600 hover:text-white transition-colors"
              // >
                className="block text-center bg-emerald-600 text-white border-2 border-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Become a Guide
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
