import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BankProblemService } from 'src/app/@services/bank-problem.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit ,OnChanges {

  files: any;
  fileName: string;
  uploadedFiles = [];
  @Input() inputFiles = [];
  @Output() onUplodFileEmmit = new EventEmitter();
  constructor(
    private bankProblemService: BankProblemService
  ) { }
ngOnChanges(changes: SimpleChanges): void {
  if(this.inputFiles && this.inputFiles.length){
    this.uploadedFiles = this.inputFiles
  }
}
  upenUrl(e, fileName) {
    e.stopPropagation();
    this.bankProblemService.getFile(fileName).subscribe(blob => {
      //  console.log(res)
      let url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = fileName;
      a.target = '_blank';
      a.click();
    })

  }

  ngOnInit(): void {
  }
  onFileDropped($event: any) {

    this.files = $event;
    this.uploadFile();
  }
  fileBrowseHandler(e: any) {
    //   console.log(e.target.files);
    this.files = e.target.files;
    this.uploadFile();
  }


  uploadFile() {
    if (!this.files || !this.files.length) return;

    console.log(this.files)
    const callList = [];

    for (const file of this.files) {
      const formData = new FormData();
      formData.append('file', file) // appending every file to formdata
      callList.push(this.bankProblemService.uploadFile(formData))
    }






    forkJoin(callList).subscribe((_response: any) => {
      if (_response.every(x => x.Success)) {
        _response.forEach(r => {
         
          this.uploadedFiles = this.uploadedFiles.concat(r.Result);
          console.log(this.uploadedFiles)
        });
        this.onUplodFileEmmit.emit(this.uploadedFiles);
      }
    })
  }
}
