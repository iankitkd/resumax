
export async function pdfToImage( pdfData: ArrayBuffer, pages?: number, scale = 2): Promise<string[]> {

  if (typeof window === "undefined") {
    throw new Error("pdfToImageInBrowser must be called in the browser");
  }

  // dynamic import ensures this code runs only in the browser
  const pdfjsLib = await import("pdfjs-dist");
  // const pdfWorkerMod = await import('pdfjs-dist/legacy/build/pdf.worker.entry');
  // pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerMod?.default ?? pdfWorkerMod;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const imageUrls: string[] = [];

  const totalPages = pages || pdf.numPages;
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvas, canvasContext: context!, viewport }).promise;

    const imageData = canvas.toDataURL("image/png");
    imageUrls.push(imageData);
  }

  return imageUrls;
}
