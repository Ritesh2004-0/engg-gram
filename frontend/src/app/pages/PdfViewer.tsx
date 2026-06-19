import { useParams } from "react-router";

export function PdfViewer() {

  const { fileName } = useParams();

  if (!fileName) {

    return (
      <div className="text-center mt-10">
        PDF not found
      </div>
    );
  }

  const pdfUrl = decodeURIComponent(fileName);

  return (

    <div className="w-full h-screen">

      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        className="w-full h-full"
      />

    </div>
  );
}