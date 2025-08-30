import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import CircularDial from './CircularDial';
import axios from 'axios'

function Upload() {
  const [file, setFile] = useState(null);
  const [targetJob, setTargetJob] = useState('');
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.pdf')) {
        setFile(droppedFile);
      } else {
        alert('Please upload a PDF file only.');
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
        setFile(selectedFile);
      } else {
        alert('Please upload a PDF file only.');
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !targetJob.trim()) {
      alert('Please select a resume file and enter a target job.');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('target', targetJob);

      const response =  await axios.post('http://localhost:5000/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response.data)
      if (response) {
        const data = response.data;
        setResults(data);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getColorForPercentage = (percentage) => {
    if (percentage >= 70) return { color: 'green', bg: 'bg-green-100', text: 'text-green-700' };
    if (percentage >= 40) return { color: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-700' };
    return { color: 'red', bg: 'bg-red-100', text: 'text-red-700' };
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Resume</h1>
          <p className="text-gray-600">Upload your resume and get instant ATS analysis</p>
        </div>

        {!results ? (
          <div className="bg-white rounded-xl shadow-md p-8">
            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume File (PDF only)
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : file
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileSelect}
                />
                
                {file ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-green-700 font-medium">{file.name}</p>
                      <p className="text-sm text-green-600">File selected successfully</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drop your resume here, or{' '}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-sm text-gray-500">PDF files only, up to 10MB</p>
                  </>
                )}
              </div>
            </div>

            {/* Target Job Input */}
            <div className="mb-6">
              <label htmlFor="targetJob" className="block text-sm font-medium text-gray-700 mb-2">
                Target Job Title
              </label>
              <input
                id="targetJob"
                type="text"
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                placeholder="e.g., Senior Frontend Developer, Data Scientist, Product Manager"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!file || !targetJob.trim() || uploading}
              className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                !file || !targetJob.trim() || uploading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {uploading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Analyzing Resume...</span>
                </div>
              ) : (
                'Analyze Resume'
              )}
            </button>
          </div>
        ) : (
          /* Results Display */
          <div className="space-y-8">
            {/* Main Target Job Result */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Analysis Results for: <span className="text-blue-600">{targetJob}</span>
              </h2>
              
              <div className="flex justify-center mb-6">
                <CircularDial
                  percentage={results.target_job_chance}
                  size={200}
                  strokeWidth={12}
                  color={getColorForPercentage(results.target_job_chance).color}
                />
              </div>

              <div className={`text-center p-4 rounded-lg ${getColorForPercentage(results.target_job_chance).bg}`}>
                <p className={`text-lg font-semibold ${getColorForPercentage(results.target_job_chance).text}`}>
                  {results.target_job_chance >= 70 
                    ? 'Excellent match! Your resume is well-optimized for this role.'
                    : results.target_job_chance >= 40
                    ? 'Good potential! Some optimization could improve your chances.'
                    : 'Needs improvement. Consider tailoring your resume more closely to this role.'
                  }
                </p>
              </div>
            </div>

            {/* Top 3 Alternative Jobs */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Alternative Job Opportunities</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {results.top3_jobs.map((job, index) => (
                  <div key={index} className="text-center">
                    <CircularDial
                      percentage={job.probability}
                      size={120}
                      strokeWidth={8}
                      color={getColorForPercentage(job.probability).color}
                    />
                    <h4 className="font-semibold text-gray-900 mt-4 mb-1">{job.job}</h4>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getColorForPercentage(job.probability).bg} ${getColorForPercentage(job.probability).text}`}>
                      {job.probability.toFixed(1)}% Match
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setResults(null);
                  setFile(null);
                  setTargetJob('');
                }}
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;