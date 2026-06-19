import { useParams } from "react-router";

export function PdfViewer() {

  const { fileName } = useParams();

  if (!fileName)
    return <h1>PDF Not Found</h1>;

  const pdfUrl =
    decodeURIComponent(fileName);

  return (
    <iframe
      src={pdfUrl}
      className="w-full h-screen"
      title="PDF Viewer"
    />
  );
}