import React from 'react';
import { Camera, MapPin, Send, ArrowLeft } from 'lucide-react';
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center">
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
                  className="w-full bg-white text-black p-4 rounded-lg shadow-sm border hover:border-blue-300 hover:shadow-md transition-all text-left"
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center">
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
                  className="w-full bg-white text-black p-4 rounded-lg shadow-sm border hover:border-blue-300 hover:shadow-md transition-all text-left font-medium"
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center">
            <button onClick={goBack} className="mr-4">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Report Issue - Details</h1>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
              <button className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center hover:bg-gray-50">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-500">Take Photo</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newIssue.description}
                onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                placeholder="Describe the issue in detail..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
              />
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
                <button className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmitIssue}
              className="w-full bg-blue-500 text-white p-4 rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center"
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
