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
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");

 const handleUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (preview) URL.revokeObjectURL(preview); // cleanup old

    const newPreview = URL.createObjectURL(file);
    setImage(file);
    setPreview(newPreview);
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
    setReport(null);

    try {
      const base64Image = await convertToBase64(image);

      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({
        model: selectedModel,
      });
      console.log("genAI data: ", genAI);
      

      const prompt = `
You are a welding inspection expert.

Analyze the image and detect (if any):
- Undercut
- Underfill
- Excess Reinforcement
- Blow Holes

CRITICAL INSTRUCTIONS:
- Always return bounding box
- Use values between 0 and 100 (percentage of image)
- Do NOT use pixel values

FORMAT:
{
  "defects": [
    {
      "type": "",
      "severity": "Low | Medium | High", 
      "description": "",
      "box": {
        "x": 0-100,
        "y": 0-100,
        "width": 0-100,
        "height": 0-100
      }
    }
  ],
  "overall_quality": ""
}
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

if (!parsed || !parsed.defects) {
  console.error("Invalid Gemini response:", text);
  alert("AI returned invalid format. Try another image.");
  setReport(null);
} else {
  setReport(parsed);
}

    } catch (err) {
      console.error(err);
      alert("Error analyzing image");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100  p-6 pt-[120px] sm:pt-[100px]">

      <UploadSection
        handleUpload={handleUpload}
        handleReview={handleReview}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        loading={loading}
      />

      {loading && <Loading />}

      <ImageSection preview={preview} report={report} />

      <ReportSection report={report} />
    </div>
  );
}

export default App;