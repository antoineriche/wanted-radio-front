import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesManagementComponent } from './games-management.component';
import { PlebQuestionModule } from '../shared-components/pleb-question/pleb-question.module';
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [GamesManagementComponent],
  imports: [
    CommonModule,
    PlebQuestionModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GamesManagementModule { }
