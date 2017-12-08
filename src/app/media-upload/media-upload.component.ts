import {Component, OnInit,  Output, EventEmitter , ViewEncapsulation} from '@angular/core';
import {MediaUploadService} from './media-upload.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MediaUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadService: MediaUploadService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  @Output() eventemetter = new EventEmitter();
  paths: any ;
  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.paths = JSON.parse('' + event.body).path ;
         this.eventemetter.emit(event.body + '')  ;
      }
    });

    this.selectedFiles = undefined ;
  }

}
