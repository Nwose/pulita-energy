"use client";

import React, { useState } from "react";

interface PdfCard {
  name: string;
  file: string;
}

interface PdfCardsProps {
  pdfs?: PdfCard[];
}

const PdfCards: React.FC<PdfCardsProps> = ({ pdfs }) => {
  const [loadingPdf, setLoadingPdf] = useState<string | null>(null);
  
  if (!pdfs || pdfs.length === 0) return null;

  const handlePdfView = async (pdf: PdfCard) => {
    setLoadingPdf(pdf.name);
    
    try {
      // First try to open directly
      const newWindow = window.open(pdf.file, '_blank');
      
      // Check if the window was opened successfully (not blocked by popup blocker)
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // If popup was blocked, try the download approach
        await downloadAndOpenPdf(pdf);
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
      // Fallback to download approach
      await downloadAndOpenPdf(pdf);
    } finally {
      setLoadingPdf(null);
    }
  };

  const downloadAndOpenPdf = async (pdf: PdfCard) => {
    try {
      // Convert image URL to raw URL if needed
      const rawUrl = pdf.file.replace('/image/upload/', '/raw/upload/');
      
      const response = await fetch(rawUrl, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      // Open the PDF in a new tab
      window.open(blobUrl, '_blank');
      
      // Clean up after a delay
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to load the PDF. Please try again or contact support.');
      
      // Final fallback: try to open the original URL directly
      window.open(pdf.file, '_blank');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pdfs.map((pdf: PdfCard, index: number) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-blue-300 relative"
          onClick={() => handlePdfView(pdf)}
        >
          {loadingPdf === pdf.name && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          
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
        </div>
      ))}
    </div>
  );
};

export default PdfCards;