import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import UploadSection from "./components/UploadSection";
import ImageSection from "./components/ImageSection";
import ReportSection from "./components/ReportSection";
import Loading from "./components/Loading";
import { parseGeminiResponse } from "./utils/parseGemini";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [report, setReport] = useState("null");
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
    });
  };

  const handleReview = async () => {
    if (!image) {
      alert("Upload image first");
      return;
    }

    setLoading(true);
setReport("");

    try {
      const base64Image = await convertToBase64(image);

      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
You are a welding inspection expert.

Analyze the welding image and detect defects:
- Undercut
- Underfill
- Excess Reinforcement
- Blow Holes

IMPORTANT:
Also provide approximate bounding box for each defect.

Return STRICT JSON ONLY:

{
  "defects": [
    {
      "type": "",
      "severity": "Low | Medium | High",
      "description": "",
      "box": {
        "x": number,
        "y": number,
        "width": number,
        "height": number
      }
    }
  ],
  "overall_quality": ""
}

Rules:
- Coordinates must be in pixels relative to image
- If unsure, estimate reasonably
- Do not return text outside JSON
`;

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
      ]);

      const text = result.response.text();
     const parsed = parseGeminiResponse(text);
setReport(parsed);
    } catch (err) {
      console.error(err);
      alert("Error analyzing image");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Welding Quality Analyzer
      </h1>

      <UploadSection
        handleUpload={handleUpload}
        handleReview={handleReview}
      />

      {loading && <Loading />}

      <ImageSection preview={preview} report={report} />

      <ReportSection report={report} />
    </div>
  );
}

export default App;