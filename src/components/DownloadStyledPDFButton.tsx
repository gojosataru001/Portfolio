// src/components/DownloadStyledPDFButton.jsx
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CVFormData } from "./CVForm";

export default function DownloadPDFButton() {
  const handleDownload = async () => {
    const cvElement = document.getElementById("cv-preview");
    if (!cvElement) return;

    const canvas = await html2canvas(cvElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("MyStyledCV.pdf");
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Download CV as PDF
    </button>
  );
}
