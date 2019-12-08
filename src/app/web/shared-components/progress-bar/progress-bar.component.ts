import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, SimpleChanges, OnChanges, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, AfterViewInit {
  
  @ViewChild("progressContent", {static: false}) progressContent: ElementRef;
  @ViewChild("progressContainer", {static: false}) progressContainer: ElementRef;

  
  private currentProgress: number;
  private _maxTime: number;
  private _minTime: number;
  private _currentTime: number;
  
  @Input() set progress(valeur: number) {
    this.currentProgress = valeur;
    this.updateProgress(this.currentProgress);
  }

  @Input() private readonly containerStyle: any;
  @Input() private contentStyle: any;
  

  constructor(private renderer: Renderer2) { 
  }

  ngOnInit(){
  }

  ngAfterViewInit(): void {
    if(this.containerStyle){
      this.renderer.setStyle(this.progressContainer.nativeElement, 'height', this.containerStyle.height);
      this.renderer.setStyle(this.progressContainer.nativeElement, 'border', this.containerStyle.border);
      this.renderer.setStyle(this.progressContainer.nativeElement, 'border-radius', this.containerStyle.borderRadius);
      this.renderer.setStyle(this.progressContainer.nativeElement, 'background-color', this.containerStyle.color);
    }

    if(this.contentStyle){
      this.renderer.setStyle(this.progressContent.nativeElement, 'background-color', this.contentStyle.color);
    }
    console.log('progress-bar is set');
  }

  updateProgress(currentProgress: number){
    this.progressContent.nativeElement.style.width = currentProgress + '%';
  }

  setMaxTime(maxTime: number){
    this._maxTime = maxTime;
  }

  setMinTime(minTime: number){
    this._minTime = minTime;
  }

  setCurrentTime(currentTime: number){
    this._currentTime = currentTime;
  }

  setRemainingTime(remainingTime: number){
    if(this._maxTime){
      this._currentTime = this._maxTime - remainingTime;
    }
  }

  update(){
    if(this._maxTime){
      let percent = 100 * (this._currentTime) / this._maxTime;
      percent = parseFloat(''+Math.round(percent*100)/100);
      this.updateProgress(percent);
    }
  }

  reset(){
    this.updateProgress(0);
  }

}
