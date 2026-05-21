import LabeledImage from "./LabeledImage";

const ImageSection = ({ preview, report }) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6 h-[350px] object-cover">
      {/* Original */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Original Image</h2>
        {preview ? (
          <img src={preview} className="object-contain rounded" />
        ) : (
          <p className="text-gray-400">No image uploaded</p>
        )}
      </div>

      {/* Labeled */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Labeled Image</h2>

        {preview && report?.defects ? (
          <LabeledImage
            imageSrc={preview}
            defects={report.defects}
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