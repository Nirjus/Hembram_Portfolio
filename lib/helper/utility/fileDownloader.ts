import FileSaver from "file-saver";

export const handleDownload = async (pdfUrl: string) => {
    try {
        const response = await fetch(pdfUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to download PDF');
        }

        const blob = await response.blob();
        FileSaver.saveAs(blob, 'Hembram_CV.pdf'); // Name the file here
    } catch (error: any) {
        console.error('Error downloading the file:', error.message);
    }
};