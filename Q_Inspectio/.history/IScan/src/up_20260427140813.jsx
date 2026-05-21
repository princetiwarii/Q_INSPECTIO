import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle Image Upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Review Button (for now just console log)
  const handleReview = () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }
    console.log("Image ready to send to API:", image);
    alert("Next step: API integration");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Welding Quality Analyzer
      </h1>

      {/* Upload Section */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-4 items-center justify-center">
        <input type="file" accept="image/*" onChange={handleUpload} />
        <button
          onClick={handleReview}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Review
        </button>
      </div>

      {/* Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Original Image */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Original Image</h2>
          {preview ? (
            <img src={preview} alt="Preview" className="w-full rounded" />
          ) : (
            <p className="text-gray-400">No image uploaded</p>
          )}
        </div>

        {/* Labeled Image (empty for now) */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Labeled Image</h2>
          <div className="w-full h-64 flex items-center justify-center text-gray-400 border">
            Will show after analysis
          </div>
        </div>
      </div>

      {/* Report Section */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Analysis Report</h2>
        <p className="text-gray-400">
          Report will appear here after API call
        </p>
      </div>
    </div>
  );
}

export default App;