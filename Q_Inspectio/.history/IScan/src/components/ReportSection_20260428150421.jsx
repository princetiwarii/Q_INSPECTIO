import React from "react";

const ReportSection = ({ report }) => {
  if (!report) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Analysis Report</h2>
        <p className="text-gray-400">Report will appear here</p>
      </div>
    );
  }
  console.log(report);
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-4">Analysis Report</h2>

      {/* Overall Quality */}
      <div className="mb-4">
        <span className="font-semibold">Overall Quality: </span>
        <span
          className={`px-3 py-1 rounded-xl text-white ${
            report.overall_quality === "Good"
              ? "bg-green-500"
              : report.overall_quality === "Moderate"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {report.overall_quality}
        </span>
      </div>

      {/* Defects */}
      <div className="space-y-3">
        {report.defects?.length > 0 ? (
          report.defects.map((defect, index) => (
            <div
              key={index}
              className="border p-3 rounded bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {defect.type}
                </h3>

                <span
                  className={`px-2 py-1 text-sm rounded text-white ${
                    defect.severity === "High"
                      ? "bg-red-500"
                      : defect.severity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {defect.severity}
                </span>
              </div>

              <p className="text-sm mt-2 text-gray-700">
                {defect.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No defects detected</p>
        )}
      </div>
    </div>
  );
};

export default ReportSection;