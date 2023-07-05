import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {createPDF} from "$lib/util/createPDF.js";

export function downloadPDF(scan) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = createPDF(scan);
    pdfMake.createPdf(docDefinition).download('scan_rapport.pdf');
}