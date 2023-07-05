import {createPDF} from "$lib/util/createPDF.js";
import { vfs } from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function openPDF(scan) {
    const pdfFonts = vfs.pdfMake.vfs;
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = createPDF(scan);
    pdfMake.createPdf(docDefinition).open();
}
