import { useParams } from "react-router";

export function PdfViewer() {

  const { fileName } = useParams();

  if (!fileName) {
    return <h1>PDF Not Found</h1>;
  }

  const pdfUrl = decodeURIComponent(fileName);

  return (
    <div className="w-full h-screen">
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        title="PDF Viewer"
      />
    </div>
  );
}