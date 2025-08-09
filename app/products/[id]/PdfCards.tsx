"use client";

import React, { useState } from "react";
import PdfViewer from "./PdfViewer";

interface PdfCard {
  name: string;
  file: string;
  downloadUrl?: string;
}

interface PdfCardsProps {
  pdfs?: PdfCard[];
}

const PdfCards: React.FC<PdfCardsProps> = ({ pdfs }) => {
  const [selectedPdf, setSelectedPdf] = useState<PdfCard | null>(null);

  if (!pdfs || pdfs.length === 0) return null;

  const handlePdfView = (pdf: PdfCard) => {
    setSelectedPdf(pdf);
  };

  const handlePdfDownload = (pdf: PdfCard) => {
    const link = document.createElement("a");
    link.href = pdf.downloadUrl || pdf.file;
    link.download = `${pdf.name}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfs.map((pdf: PdfCard, index: number) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-blue-300"
            onClick={() => handlePdfView(pdf)}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center group-hover:text-red-600 transition-colors">
              {pdf.name}
            </h3>
            {/* <div className="flex justify-center space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePdfView(pdf);
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
              >
                👁️ View
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePdfDownload(pdf);
                }}
                className="text-sm text-green-600 hover:text-green-800 font-medium hover:underline transition-colors"
              >
                📄 Download
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {selectedPdf && (
        <PdfViewer
          pdfUrl={selectedPdf.file}
          pdfName={selectedPdf.name}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </>
  );
};

export default PdfCards;
