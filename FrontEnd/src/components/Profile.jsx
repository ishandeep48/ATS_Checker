import React, { useState } from 'react';
import { Edit2, Save, X, FileText, Trash2 } from 'lucide-react';

function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567'
  });

  const [resumes, setResumes] = useState([
    { id: 1, name: 'Software Engineer Resume', uploadDate: '2024-01-15' },
    { id: 2, name: 'Frontend Developer Resume', uploadDate: '2024-01-10' },
    { id: 3, name: 'Full Stack Resume', uploadDate: '2024-01-05' }
  ]);

  const [editingInfo, setEditingInfo] = useState(false);
  const [editingResume, setEditingResume] = useState(null);
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);
  const [tempResumeName, setTempResumeName] = useState('');

  const handleSaveUserInfo = () => {
    setUserInfo(tempUserInfo);
    setEditingInfo(false);
  };

  const handleCancelUserInfo = () => {
    setTempUserInfo(userInfo);
    setEditingInfo(false);
  };

  const handleEditResume = (resume) => {
    setEditingResume(resume.id);
    setTempResumeName(resume.name);
  };

  const handleSaveResume = () => {
    setResumes(resumes.map(resume => 
      resume.id === editingResume 
        ? { ...resume, name: tempResumeName }
        : resume
    ));
    setEditingResume(null);
    setTempResumeName('');
  };

  const handleCancelResume = () => {
    setEditingResume(null);
    setTempResumeName('');
  };

  const handleDeleteResume = (id) => {
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your personal information and resumes</p>
        </div>

        {/* User Information Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            {!editingInfo && (
              <button
                onClick={() => setEditingInfo(true)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {editingInfo ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={tempUserInfo.name}
                  onChange={(e) => setTempUserInfo({ ...tempUserInfo, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={tempUserInfo.email}
                  onChange={(e) => setTempUserInfo({ ...tempUserInfo, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={tempUserInfo.phone}
                  onChange={(e) => setTempUserInfo({ ...tempUserInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleSaveUserInfo}
                  className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancelUserInfo}
                  className="flex items-center space-x-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <p className="text-lg font-medium text-gray-900">{userInfo.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-lg font-medium text-gray-900">{userInfo.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                <p className="text-lg font-medium text-gray-900">{userInfo.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Resumes Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">My Resumes</h2>
          
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    {editingResume === resume.id ? (
                      <input
                        type="text"
                        value={tempResumeName}
                        onChange={(e) => setTempResumeName(e.target.value)}
                        className="text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{resume.name}</h3>
                        <p className="text-sm text-gray-500">Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {editingResume === resume.id ? (
                      <>
                        <button
                          onClick={handleSaveResume}
                          className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors duration-200"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancelResume}
                          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditResume(resume)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteResume(resume.id)}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {resumes.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No resumes uploaded yet</p>
                <Link
                  to="/upload"
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 mt-2"
                >
                  <span>Upload your first resume</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;