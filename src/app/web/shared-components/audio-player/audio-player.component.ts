import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { AudioSong } from 'src/app/model/audio-part';
import { AudioService } from 'src/app/services/audio.service';
import { CountDownService } from 'src/app/services/count-down.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import * as formatterUtils from 'src/app/web/utils/time-formatter';


const TIMER_NAME = "favorite";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  @ViewChild(ProgressBarComponent, {static: false}) progressBar: ProgressBarComponent;
  @Input() audio: AudioSong;
  @Input() test: Function;

  private readonly faPause = faPause;
  private readonly faPlay = faPlay;
  private readonly faStop = faStop;

  private totalDuration = 0;
  private currentTime = 0;
  private isPlaying = false;
  private isPause = false;

  private isLoading: boolean;
  private progress: number;

  constructor(private audioService: AudioService, private countDownService: CountDownService) { }

  ngOnInit() {
    this.getAudioDuration(this.audio);
  }

  onDurationLoaded(duration: number): void{
    this.isLoading = false;
    this.totalDuration = duration * 1000;
    this.progressBar.setMaxTime(this.totalDuration);
  }

  getAudioDuration(audio: any){
    this.isLoading = true;
    
    if(audio && audio.source){
      this.audioService.loadMedia(audio, this.onDurationLoaded.bind(this));
    }
  }

  setCountDownTick(duration: number){
    this.countDownService.registerObs(TIMER_NAME, duration, duration,
      (remainingTime: number) => {
        this.updateProgress(remainingTime)
        this.currentTime = this.totalDuration - remainingTime;
      },
      (err: string) => console.error(err),
      () => console.warn('end')
    );
  }

  updateProgress(remainingTime: number){
    this.progressBar.setRemainingTime(remainingTime);
    this.progressBar.update();
  }

  play(){
    if(this.audioService.canPlay()){
      if(!this.isPlaying && !this.isPause){
        this.setCountDownTick(this.totalDuration);
        this.audioService.play(this.audio.source);
        this.countDownService.startCountDown(TIMER_NAME);
        this.isPlaying = true;
      } else if (this.isPause) {
        this.resume();
      }
    } else {
      console.error("audio service already in use")
    }
  }

  pause(){
    if(this.isPlaying){
      this.audioService.pause();
      this.isPlaying = false;
      this.isPause = true;
      this.countDownService.pause(TIMER_NAME);
    }
  }

  resume(){
    if(!this.isPlaying){
      this.audioService.resume(this.audio, this.currentTime);
      this.isPlaying = true;
      this.isPause = false;
      this.countDownService.resume(TIMER_NAME);
    }
  }

  stop(){
    this.pause();
    this.isPause = false;
    this.countDownService.stop(TIMER_NAME);
    this.reset();
  }

  reset() {
    this.audioService.stopSong();
    this.progressBar.reset();
    this.currentTime = 0;
  }

  _toHHMMSS(time: number){
    return formatterUtils.toHHMMSS(time);
  }

}
