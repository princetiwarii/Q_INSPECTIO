import React from "react";

const ImageSection = ({ preview }) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      {/* Original */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Original Image</h2>
        {preview ? (
          <img src={preview} className="w-full rounded" />
        ) : (
          <p className="text-gray-400">No image uploaded</p>
        )}
      </div>

      {/* Labeled */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Labeled Image</h2>
        <div className="h-64 flex items-center justify-center text-gray-400 border">
          Coming in next step
        </div>
      </div>
    </div>
  );
};

export default ImageSection;