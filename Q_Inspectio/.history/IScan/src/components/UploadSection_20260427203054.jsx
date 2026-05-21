import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");

//   // Upload image
//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // Convert image → Base64
//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const base64 = reader.result.split(",")[1];
//         resolve(base64);
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   // Main function: call Gemini
//   const handleReview = async () => {
//     if (!image) {
//       alert("Upload image first");
//       return;
//     }

//     setLoading(true);
//     setReport("");

//     try {
//       const base64Image = await convertToBase64(image);

//       const genAI = new GoogleGenerativeAI(
//         import.meta.env.VITE_GEMINI_API_KEY,
//         { apiVersion: "v1" }
//       );

      const model = genAI.getGenerativeModel({
        model: selectedModel,
      });

//       const prompt = `
// You are a professional welding inspection expert.

// Analyze this welding image carefully.

// Detect ONLY these defects:
// 1. Undercut
// 2. Underfill
// 3. Excess Reinforcement
// 4. Blow Holes

// Return STRICT JSON ONLY (no extra text):

// {
//   "defects": [
//     {
//       "type": "",
//       "severity": "Low | Medium | High",
//       "description": ""
//     }
//   ],
//   "overall_quality": "Good | Moderate | Poor"
// }
// `;

//       const result = await model.generateContent([
//         prompt,
//         {
//           inlineData: {
//             mimeType: "image/jpeg",
//             data: base64Image,
//           },
//         },
//       ]);

//       const text = result.response.text();
//       setReport(text);
//     } catch (error) {
//       console.error(error);
//       alert("Error analyzing image");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold text-center mb-6">
//         Welding Quality Analyzer
//       </h1>

//       {/* Upload */}
//       <div className="bg-white p-4 rounded shadow mb-6 flex gap-4 justify-center">
//         <input type="file" accept="image/*" onChange={handleUpload} />
//         <button
//           onClick={handleReview}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Review
//         </button>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <p className="text-center text-blue-500 mb-4">
//           Analyzing image...
//         </p>
//       )}

//       {/* Images */}
//       <div className="grid grid-cols-2 gap-6 mb-6">
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">Original Image</h2>
//           {preview ? (
//             <img src={preview} className="w-full rounded" />
//           ) : (
//             <p className="text-gray-400">No image uploaded</p>
//           )}
//         </div>

//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">Labeled Image</h2>
//           <div className="h-64 flex items-center justify-center text-gray-400 border">
//             Coming in next step
//           </div>
//         </div>
//       </div>

//       {/* Report */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-2">Analysis Report</h2>
//         {report ? (
//           <pre className="text-sm whitespace-pre-wrap">{report}</pre>
//         ) : (
//           <p className="text-gray-400">
//             Report will appear here
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";

const UploadSection = ({ handleUpload, handleReview }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6 flex gap-4 justify-center">
      
      <input type="file" accept="image/*" onChange={handleUpload} />
      <button
        onClick={handleReview}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Review
      </button>
    </div>
  );
};

export default UploadSection;