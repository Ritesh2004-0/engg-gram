import { useParams } from "react-router";

export function PdfViewer() {
  const { fileName } = useParams();

  if (!fileName) {
    return <div>PDF not found</div>;
  }

  const pdfUrl = decodeURIComponent(fileName);

  return (
    <div className="w-full h-screen">
      <iframe
        src={pdfUrl}
        className="w-full h-full"
        title="PDF Viewer"
      />
    </div>
  );
}