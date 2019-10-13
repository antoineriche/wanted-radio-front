import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PointsService } from '../../../services/points.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent {

  private currentPoints: number = 0;
  private canPlay: boolean = true;
  @Output() onPointsUpdated: EventEmitter<number> = new EventEmitter<number>();

  constructor(private pointsService: PointsService) { }

  private disable(){
    this.canPlay = false;
  }

  private enable(){
    this.canPlay = true;
  }

  private reducePoints(): void{
    this.disable();
    this.currentPoints = this.pointsService.reducePoints(() => this.enable());
    this.emitPoints();
  }

  private addPoints(): void {
    this.disable();
    this.currentPoints = this.pointsService.addPoints(() => this.enable());
    this.emitPoints();
  }

  private resetPoints(): void {
    this.disable();
    this.currentPoints = this.pointsService.resetPoints();
    this.emitPoints();
  }

  private emitPoints(){
    this.onPointsUpdated.emit(this.currentPoints);
  }
}
