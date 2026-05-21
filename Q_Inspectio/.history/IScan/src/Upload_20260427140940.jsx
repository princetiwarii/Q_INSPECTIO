import React from 'react'


function Upload(){
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
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-4 items-center justify-center">
        <input type="file" accept="image/*" onChange={handleUpload} />
        <button
          onClick={handleReview}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Review
        </button>
      </div>
  )
}

export default Upload