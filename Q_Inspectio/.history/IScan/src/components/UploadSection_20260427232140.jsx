import React from "react";

const UploadSection = ({
  handleUpload,
  handleReview,
  selectedModel,
  setSelectedModel,
  loading
}) => {
  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          AI Model Configuration
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <label
            htmlFor="model-select"
            className="font-medium text-gray-700 min-w-fit"
          >
            Select Gemini Model:
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="gemini-2.5-flash">
              Gemini 2.5 Flash (Fast & Cost-Effective)
            </option>
            <option value="gemini-2.5-pro">
              Gemini 2.5 Pro (Higher Quality Analysis)
            </option>
            <option value="gemini-3-flash-preview">
              Gemini 3 Flash Preview (Latest Features)
            </option>
          </select>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Choose the AI model that best fits your analysis needs and budget.
        </p>
      </div>

      {/* File Upload */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Upload Welding Image
        </h3>
        <div className="flex flex-col sm:flex-row gap-4  bg-green-400">
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: JPG, PNG, GIF, WebP. Max size: 10MB.
            </p>
          </div>
          <button
              onClick={handleReview}
              disabled={loading}
              className="px-8 py-3 mb-6 bg-blue-600 text-white font-medium rounded-md 
             hover:bg-blue-700 
              disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Analyzing..." : "Analyze Image"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;