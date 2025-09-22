import React from 'react';
import { Camera, MapPin, Send, ArrowLeft, Mic } from 'lucide-react';
import { ISSUE_CATEGORIES } from '../../data/mockData';

const ReportIssueScreen = ({
  goBack,
  reportStep,
  newIssue,
  handleCategorySelect,
  handleSubcategorySelect,
  setNewIssue,
  handleSubmitIssue,
}) => {
    if (reportStep === 1) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-4 flex items-center">
            <button onClick={goBack} className="mr-4">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Report Issue - Category</h1>
          </div>
          
          <div className="p-4">
            <p className="text-gray-600 mb-6">Select the category that best describes your issue:</p>
            <div className="space-y-3">
              {Object.entries(ISSUE_CATEGORIES).map(([category, info]) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="w-full bg-white text-black p-4 rounded-lg shadow-sm border-1 border-indigo-200 hover:shadow-md  text-left hover:scale-105 hover:border-indigo-300 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{info.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{category}</div>
                      <div className="text-sm text-gray-500">{info.subcategories.slice(0, 2).join(', ')}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (reportStep === 2) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-4 flex items-center">
            <button onClick={goBack} className="mr-4">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Report Issue - Type</h1>
          </div>
          
          <div className="p-4">
            <p className="text-gray-600 mb-6">What specific type of {newIssue.category.toLowerCase()} issue?</p>
            <div className="space-y-3">
              {ISSUE_CATEGORIES[newIssue.category].subcategories.map(subcategory => (
                <button
                  key={subcategory}
                  onClick={() => handleSubcategorySelect(subcategory)}
                  className="w-full bg-white text-black p-4 rounded-lg shadow-sm  border-1 border-indigo-200 hover:border-indigo-300 hover:shadow-md transition-all text-left font-medium hover:scale-105 duration-200"
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (reportStep === 3) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-4 flex items-center">
            <button onClick={goBack} className="mr-4">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Report Issue - Details</h1>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <label htmlFor="issue-photo" className="block text-sm font-medium text-gray-700 mb-2">Photo (Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {newIssue.imagePreview ? (
                    <img src={newIssue.imagePreview} alt="Issue Preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                  ) : (
                    <Camera className="mx-auto h-12 w-12 text-blue-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setNewIssue({
                              ...newIssue,
                              image: file,
                              imagePreview: URL.createObjectURL(file),
                            });
                          } else {
                            setNewIssue({ ...newIssue, image: null, imagePreview: null });
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <div className="flex">
                <textarea
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                  placeholder="Describe the issue in detail..."
                  className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                />
                <button className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200 flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="flex">
                <input
                  type="text"
                  value={newIssue.location}
                  onChange={(e) => setNewIssue({...newIssue, location: e.target.value})}
                  placeholder="Enter or detect location..."
                  className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmitIssue}
              className="w-full bg-gradient-to-tr from-emerald-500 to-blue-500 text-white p-4 rounded-lg font-medium hover:bg-gradient-to-br flex items-center justify-center hover:scale-105 transition-all duration-500 hover:shadow-lg ease-in-out"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Report
            </button>
          </div>
        </div>
      );
    }
  };

export default ReportIssueScreen;
