import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../utils/file.service';
import { MenuItem } from 'primeng/api';

interface Text {
  id: number;
  title: string;
  content: string;
  copied?: boolean;
  url: string;
}

@Component({
  selector: 'app-summarized-item',
  templateUrl: './summarized-item.component.html',
  styleUrl: './summarized-item.component.css',
})
export class SummarizedItemComponent {
  @Input() data!: Text[];
  @Output() removeEvent = new EventEmitter();

  items: MenuItem[] = [];

  constructor(private fileService: FileService) {}

  copyText(item: Text) {
    navigator.clipboard.writeText(`${item.title}\n${item.content}`);
    item.copied = true;
    setTimeout(() => {
      item.copied = false;
    }, 1500);
  }

  exportAsPDF(item: Text) {
    this.fileService.exportAsPDF(item);
  }

  exportAsDOCX(item: Text) {
    this.fileService.exportAsDOCX(item);
  }

  remove(item: Text) {
    this.removeEvent.emit(item);
  }

  
}
