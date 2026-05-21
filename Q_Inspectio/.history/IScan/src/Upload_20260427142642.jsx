import React, { useState, useRef } from 'react';



function Upload(){

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReview = () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }
    console.log("Image ready to send to API:", image);
    alert("Next step: API integration");
  };
  return (
    // <div class="bg-red-500 mx-8 my-5 p-5 rounded-2xl flex justify-center border-2 border-dashed border-gray-400">
    //     <div class="border-2 border-dashed border-blue-300 bg-green-400 rounded-2xl w-full flex flex-col justify-center">
    //       <img scr="" alt=""></img>
    //       <p>Drag & Drop your weld imgage here</p>
    //       <button>Browse Files</button>
    //     </div>
    //     <div>

    //     </div>
    // </div>
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-4 items-center justify-center">
        <p>Upload your Welding Img here</p>
        <div class="border border-dotted border-blue-400 text-center">
            <input type="file" accept="image/*" onChange={handleUpload} />
        </div>
        <button
          onClick={handleReview}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Analyze Weld
        </button>
      </div>
  )
}

export default Upload