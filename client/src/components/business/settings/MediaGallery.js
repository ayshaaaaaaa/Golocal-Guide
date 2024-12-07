import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ImageIcon, Film } from 'lucide-react';

const MediaGallery = ({ media, onMediaAdd, onMediaDelete }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    onMediaAdd(validFiles);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Media Gallery</label>
      
      <motion.div
        className={`border-2 border-dashed rounded-lg p-8 text-center
          ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{ borderColor: isDragging ? '#9061F9' : '#E5E7EB' }}
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => onMediaAdd(Array.from(e.target.files))}
          className="hidden"
          id="media-upload"
        />
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <button
              type="button"
              onClick={() => document.getElementById('media-upload').click()}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Upload media
            </button>
            <p className="text-sm text-gray-500 mt-1">
              or drag and drop images/videos here
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {media.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
            >
              {item.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(item)}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={URL.createObjectURL(item)}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                <button
                  onClick={() => onMediaDelete(index)}
                  className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-2 right-2">
                {item.type.startsWith('image/') ? (
                  <ImageIcon className="w-5 h-5 text-white" />
                ) : (
                  <Film className="w-5 h-5 text-white" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MediaGallery;

