import React from "react";

const ReportSection = ({ report }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Analysis Report</h2>
      {report ? (
        <pre className="text-sm whitespace-pre-wrap">{report}</pre>
      ) : (
        <p className="text-gray-400">
          Report will appear here
        </p>
      )}
    </div>
  );
};

export default ReportSection;