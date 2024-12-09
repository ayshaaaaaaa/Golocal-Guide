import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import ProfilePicture from '../../components/business/settings/ProfilePicture';
import FormInput from '../../components/business/settings/FormInput';
import SocialLinks from '../../components/business/settings/SocialLinks';
import MediaGallery from '../../components/business/settings/MediaGallery';
import Sidebar from '../../components/business/Sidebar';
import TopBar from '../../components/business/TopBar';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    businessName: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    policies: {
      cancellation: '',
      refund: ''
    },
    socialLinks: [],
    media: []
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would be your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
               <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`
                    flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg
                    hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  Save Changes
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-8 bg-white p-6 rounded-lg shadow-sm">
                <ProfilePicture
                  currentImage={formData.profilePicture}
                  onImageChange={(file) => setFormData({ ...formData, profilePicture: file })}
                  onImageDelete={() => setFormData({ ...formData, profilePicture: null })}
                />

                <div className="grid gap-6">
                  <FormInput
                    label="Business Name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Enter your business name"
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Describe your business"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput
                      label="Phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                    <FormInput
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>

                  <FormInput
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter business address"
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Cancellation Policy
                      </label>
                      <textarea
                        value={formData.policies.cancellation}
                        onChange={(e) => setFormData({
                          ...formData,
                          policies: { ...formData.policies, cancellation: e.target.value }
                        })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter cancellation policy"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Refund Policy
                      </label>
                      <textarea
                        value={formData.policies.refund}
                        onChange={(e) => setFormData({
                          ...formData,
                          policies: { ...formData.policies, refund: e.target.value }
                        })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter refund policy"
                      />
                    </div>
                  </div>

                  <SocialLinks
                    links={formData.socialLinks}
                    onChange={(links) => setFormData({ ...formData, socialLinks: links })}
                  />

                  <MediaGallery
                    media={formData.media}
                    onMediaAdd={(files) => setFormData({ ...formData, media: [...formData.media, ...files] })}
                    onMediaDelete={(index) => setFormData({
                      ...formData,
                      media: formData.media.filter((_, i) => i !== index)
                    })}
                  />
                </div>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;

