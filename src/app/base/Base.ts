import { WebService } from "../services/web.service";
import { FileService } from "../utils/file.service";

interface Summary {
  title: string;
  content: string;
}

export class Base {
    
  constructor(protected webService: WebService, protected fileService: FileService){

  } 
    
  url!: string;
  additionalPrompt!: string;
  generatingTranscript: boolean = false;
  generatingSummary: boolean = false;

  copied: boolean = false;
  saving: boolean = false;

  transcription!: string;

  errorMessage!: string;
  noTranscriptionMessage!: string;

  summary!: Summary;

  generate(url: string) {
    this.transcription = '';
    this.errorMessage = '';
    const youtubeUrlRegex =
      /^https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]+)$/;

    if (!youtubeUrlRegex.test(url)) {
      this.errorMessage = 'Please enter a valid YouTube link.';
      return;
    }

    this.generatingTranscript = true;
    this.generatingSummary = true;
    const id = url.split('watch?v=')[1];

    this.webService
      .getTranscriptionAndSummary(id, this.additionalPrompt)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.transcription = res.transcription;
          const splitRes = res.message.split('Content: ');

          const summary = {
            title: splitRes[0].replace('Title: ', '').trim(),
            content: splitRes[1],
          };

          this.summary = summary;
        },
        error: (error:any) => {
          this.noTranscriptionMessage = error.error.error;
          this.generatingTranscript = false;
          this.generatingSummary = false;
        },
        complete: () => {
          this.generatingTranscript = false;
          this.generatingSummary = false;
        },
      });
  }

  copyText() {
    if (this.summary) {
      navigator.clipboard.writeText(
        `${this.summary.title}\n${this.summary.content}`
      );
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    }
  }
  generateDocx() {
    this.fileService.exportAsDOCX(this.summary);
  }
  generatePdf() {
    this.fileService.exportAsPDF(this.summary);
  }

  save(url: string) {
    this.webService.handleItems('add', { url, ...this.summary });

    this.saving = true;
    setTimeout(() => {
      this.saving = false;
    }, 1250);
  }
}
