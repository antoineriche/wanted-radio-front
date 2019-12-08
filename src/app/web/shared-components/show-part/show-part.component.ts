import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CountDownService } from 'src/app/services/count-down.service';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-show-part',
  templateUrl: './show-part.component.html',
  styleUrls: ['./show-part.component.css']
})
export class ShowPartComponent implements OnInit, AfterViewInit {
  
  @ViewChild(ProgressBarComponent, {static: false}) private progressBar: ProgressBarComponent;

  private containerStyle: any;
  private contentStyle: any;
  private duration = 5000;

  constructor(private countDownService: CountDownService) { }

  ngOnInit() {
    console.log('on init base');  
  
    this.containerStyle = {
      'width': '43%',
      'height': '4px',
      'border': '0px solid black',
      'borderRadius': '0px',
      'color': 'white'
    };

    this.contentStyle = {
      'color': 'red'
    };
  }

  ngAfterViewInit(): void {
    this.progressBar.setMaxTime(this.duration);
    this.prepareCountDownTick(this.duration);
  }

  private start(){
    console.log('start');
    this.countDownService.startCountDown('test-compo');
  }

  private prepareCountDownTick(duration: number){
    this.countDownService.registerObs('test-compo', duration, duration,
      (remainingTime: number) => {
        this.progressBar.setRemainingTime(remainingTime);
        this.progressBar.update();
      },
      (err: string) => console.error(err),
      () => {
        this.progressBar.setRemainingTime(0);
        this.progressBar.update();
        console.log('end!');
      }
    );
  }

}
