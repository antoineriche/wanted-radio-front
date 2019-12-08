import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

  @Input() readonly project: Project;

  constructor() { }

}
