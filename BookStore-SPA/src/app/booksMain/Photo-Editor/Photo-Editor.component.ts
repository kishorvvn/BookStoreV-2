import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Photo-Editor',
  templateUrl: './Photo-Editor.component.html',
  styleUrls: ['./Photo-Editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() book: Book;
  uploader: FileUploader;
  hasBaseDropZoneOver: false;
  baseUrl = environment.apiUrl;

  constructor() { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'books/' + this.book.id,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      // maxFileSize: 100 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
  }

}
