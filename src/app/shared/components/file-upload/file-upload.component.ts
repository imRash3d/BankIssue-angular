import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BankProblemService } from 'src/app/@services/bank-problem.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  file: any;
  fileName:string;
  @Output() onUplodFileEmmit = new EventEmitter();
  constructor(
    private bankProblemService: BankProblemService
  ) { }

  ngOnInit(): void {
  }
  onFileDropped($event: any) {
    console.log($event[0])
    this.file = $event[0];
    this.uploadFile();
  }
  fileBrowseHandler(e: any) {
    // console.log(e);
    this.file = e.target.files[0];
    this.uploadFile();
  }


  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file)
    console.log(formData)
    this.bankProblemService.uploadFile(formData)
      .subscribe((r: any) => {
        if (r.Success) {
          this.fileName = r.Result.FileName;
          this.onUplodFileEmmit.emit(r.Result);
        }
      //  console.log(r)
      })
  }
}
