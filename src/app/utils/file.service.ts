import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

interface Text {
  title: string;
  content: string;
  copied?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  exportAsPDF(item: Text) {
    const doc = new jsPDF.default('p', 'px', 'a4');
    doc.setFontSize(16);
    doc.text(item.title, 20, 20);
    doc.setFontSize(12);
    doc.text(item.content, 20, 40, { maxWidth: 400 });
    doc.save(`${item.title}.pdf`);
  }

  exportAsDOCX(item: Text) {
    const doc = new Document({
      sections: [
        {
          properties: {
            
            page: {
              margin: {
                left: 480,
                right: 480,
              },
            },
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: item.title,
                  bold: true,
                  size: 32, 
                }),
              ],
            }),
            new Paragraph({
              children: [new TextRun("")], 
              spacing: { after: 100 }, 
            }),
            new Paragraph(item.content),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${item.title}.docx`);
    });
  }
}
