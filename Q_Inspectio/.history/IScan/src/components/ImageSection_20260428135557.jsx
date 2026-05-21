import LabeledImage from "./LabeledImage";

const ImageSection = ({ preview, report }) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6 h-auto w-auto object-cover bg-red-500">
      {/* Original */}
      <div className=" p-4 rounded shadow h-auto bg-green-500 object-cover">
        <h2 className="font-semibold mb-2">Original Image</h2>
        {preview ? (
          <img src={preview} className="object-contain rounded" />
        ) : (
          <p className="text-gray-400">No image uploaded</p>
        )}
      </div>

      {/* Labeled */}
      <div className="bg-blue-500 p-4 rounded shadow h-[400px] object-cover">
        <h2 className="font-semibold mb-2">Labeled Image</h2>

        {preview && report?.defects ? (
          <LabeledImage
            imageSrc={preview}
            defects={report.defects}
            // className=" max-h-[400px] object-cover rounded bg-yellow-500"
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400 border">
            No labeled image yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;