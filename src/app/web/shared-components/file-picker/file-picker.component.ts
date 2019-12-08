import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css']
})
export class FilePickerComponent implements OnInit {

  @Input() private item: FormArray;

  private file: any;
  private name: string;
  private index: number;

  private isValid = false;

  constructor() { }

  ngOnInit() {
  }

  fileChange(event: any){
    // Instantiate an object to read the file content
    let reader = new FileReader();
    // when the load event is fired and the file not empty
    if(event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      this.file = event.target.files[0];
      console.log('file', this.file);
    }
  }

  update(event: any){
    let id = event.target.id;
    if (id === 'pFileName') {
      this.name = event.target.value;
    } else if (id === 'pFileIndex') {
      this.index = event.target.value;
    } else if (id === 'pFilePicker') {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        this.file = event.target.files[0];
//        console.log('file', this.file);
      }
    }

    this.isValid = this.isFileValid();
    if(this.isValid){
      console.log('data valid');
    } else {
      console.warn('data not valid');
    }
  }

  private isFileValid(){
    return (this.name && this.name !== '') 
      && (this.index && this.index >= 0)
      && this.file;
  }

}
