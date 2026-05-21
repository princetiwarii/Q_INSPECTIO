// import React, { useState, useRef } from 'react';



// function Upload(){

//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(null);

//     const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleReview = () => {
//     if (!image) {
//       alert("Please upload an image first");
//       return;
//     }
//     console.log("Image ready to send to API:", image);
//     alert("Next step: API integration");
//   };
//   return (
//     // <div class="bg-red-500 mx-8 my-5 p-5 rounded-2xl flex justify-center border-2 border-dashed border-gray-400">
//     //     <div class="border-2 border-dashed border-blue-300 bg-green-400 rounded-2xl w-full flex flex-col justify-center">
//     //       <img scr="" alt=""></img>
//     //       <p>Drag & Drop your weld imgage here</p>
//     //       <button>Browse Files</button>
//     //     </div>
//     //     <div>

//     //     </div>
//     // </div>
//       <div className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-4 items-center justify-center">
//         <FontAwesomeIcon icon={byPrefixAndName.fas['upload']} />
//         <p>Upload your Welding Img here</p>
//         <div class="border border-dotted border-blue-400 text-center">
//             <input type="file" accept="image/*" onChange={handleUpload} />
//         </div>
//         <button
//           onClick={handleReview}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Analyze Weld
//         </button>
//       </div>
//   )
// }

// export default Upload

import { useState } from "react";

function Upload() {
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
    <div className="min-h-screen bg-gray-100 px-6 py-25">

      {/* Upload Section */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-4 items-center justify-center">
        <input type="file" accept="image/*" onChange={handleUpload} />
        <button
          onClick={handleReview}
          className="bg-blue-400 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Analyze Weld
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

export default Upload;