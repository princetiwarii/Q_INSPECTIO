import LabeledImage from "./LabeledImage";

const Card = ({ title, children }) => (
  <div className="bg-white rounded shadow flex flex-col h-[400px]">
    <h2 className="font-semibold p-4 pb-2">{title}</h2>
    <div className="flex-1 p-4 pt-0 overflow-hidden">
      {children}
    </div>
  </div>
);

const ImageSection = ({ preview, report }) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">

      {/* Original */}
      <Card title="Original Image">
        {preview ? (
          <img
            src={preview}
            className="w-full h-full object-contain rounded"
          />
        ) : (
          <p className="text-gray-400">No image uploaded</p>
        )}
      </Card>

      {/* Labeled */}
      <Card title="Labeled Image">
        {preview && report?.defects?.length > 0 ? (
          <LabeledImage
          imageSrc={preview}
          defects={report?.defects}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 border">
            No labeled image yet
          </div>
        )}
      </Card>

    </div>
  );
};

export default ImageSection;