import pdfMake from 'pdfmake/build/pdfmake';
import { vfs } from 'pdfmake/build/pdfmake';
import {createPDF} from "$lib/util/createPDF.js";

export function downloadPDF(scan) {
    const pdfFonts = vfs.pdfMake.vfs;
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = createPDF(scan);
    pdfMake.createPdf(docDefinition).download('scan_rapport.pdf');
}
