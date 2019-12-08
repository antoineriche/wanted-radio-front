import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { GuestsService } from 'src/app/services/guests.service';
import { RapperDetails, BeatBoxerDetails } from 'src/app/model/artist-details';
import { NotifierService } from 'src/app/services/notifier.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-prepare-show',
  templateUrl: './prepare-show.component.html',
  styleUrls: ['./prepare-show.component.css']
})
export class PrepareShowComponent implements OnInit {

  private rappers: RapperDetails[];
  private beatBoxers: BeatBoxerDetails[];
  private showFormCazaToof = false;

  @ViewChildren('labelFile') labels: QueryList<ElementRef>;

  private fileForm: FormGroup;
  private items: FormArray;

  constructor(private guestsService: GuestsService, private notifierService: NotifierService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildFormControl();
    this.getRappers();
    this.getBeatBoxers();
  }

  getRappers(){
    this.guestsService.getBeatBoxers().subscribe(
      data => this.beatBoxers = data,
      err => this.notifierService.showAPIError(err)
    );
  }

  getBeatBoxers(){
    this.guestsService.getRappers().subscribe(
      data => this.rappers = data,
      err => this.notifierService.showAPIError(err)
    );
  }

  buildFormControl(){
    this.fileForm = this.formBuilder.group({ 
      items: this.formBuilder.array([ this.createFileItem() ])
    });
  }

  addFileItem(): void {
    this.items = this.fileForm.get('items') as FormArray;
    this.items.push(this.createFileItem());
  }

  createFileItem(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl([Validators.required]),
      name: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required])
    });
  }

  changeFile(e) {
    console.log(e.target.files[0]);
  }

  private postFile(){
    console.log('post');
    // let file = this.file;
    // let fileName = this.fileForm.value.pFileName;
    // this.guestsService.uploadFile(file, fileName).subscribe(
    //   data => {
    //     this.notifierService.showSucess('\'' + fileName + '\' successfully uploaded.');
    //     console.log('successfully uploaded');
    //     this.fileForm.reset();
    //   },
    //   err => this.notifierService.showAPIError(err)
    // );
  }

  artistChange(event: any){
    // this.notifierService.showInfos(event.target.value);
  }

  showForm(id: string){
    if (id === 'cazaToof') {
      this.showFormCazaToof = !this.showFormCazaToof;
    }
  }


}
