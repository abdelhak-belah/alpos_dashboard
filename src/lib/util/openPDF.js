import {createPDF} from "$lib/util/createPDF.js";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function openPDF(scan) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = createPDF(scan);
    pdfMake.createPdf(docDefinition).open();
}