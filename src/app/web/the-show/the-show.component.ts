import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ShowPart } from '../../model/showpart';
import { Todo } from '../../model/todo';
import { Milestone } from '../../model/milestone';
import { TimeState } from '../../model/time-state';
import { getStatusTimeFontStyle } from '../utils/status-time-handler';
import { GuestsService } from '../../services/guests.service';
import { GuestFileInfo } from 'src/app/model/guest-file-info';
import { ArtistDetails, RapperDetails, BeatBoxerDetails } from 'src/app/model/artist-details';
import { ArtistType } from 'src/app/model/artist-type';
import { GameService } from '../../services/game.service';
import { AudioPart } from 'src/app/model/audio-part';
import { JingleService } from '../../services/jingle.service';
import { SoundService } from '../../services/sound.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';
import * as formatterUtils from 'src/app/web/utils/time-formatter';
import { AudioService } from 'src/app/services/audio.service';
import { ProgressBarComponent } from '../shared-components/progress-bar/progress-bar.component';
import { CountDownService } from 'src/app/services/count-down.service';
import { Project } from 'src/app/model/project';


const DELAY = 1000;
const GLOBAL_DELAY = 200;
const TIMER_NAME = 'global'
//TODO: get date from the server
const DATE = new Date("2019-08-24T19:15:00");

@Component({
  selector: 'app-the-show',
  templateUrl: './the-show.component.html',
  styleUrls: ['./the-show.component.css']
})
export class TheShowComponent implements OnInit, AfterViewInit {
  
  @ViewChild(ProgressBarComponent, {static: false}) private progressBar: ProgressBarComponent;

  barStyle: any = {
    'height': "0%",
    'background-color': 'red'
  };

  getStatusTimeFontStyle: any;

  globalProgressBarStyle: any = {'width': "0%"};

  itemStyles: any[];
  todos: Todo[] = [
    new Todo("Points", 1, "+/-/0"),
    new Todo("Import info", -1, "as JSON"),
    new Todo("Tabs", -1, "implement tabs"),
    new Todo("Rank", -1, "date, guest and points"),
    new Todo("Historic", -1, "retrieve the shows"),
    new Todo("Firebase", -1, "store data, logo, photos"),
    new Todo("Front for us", -1, "deal with death parts"),
    new Todo("Death part", -1, "randomize choice")
  ];

  milestones: Milestone[];
  parts: ShowPart[];
  remain: string;
  
  DURATION: number;
  startPartTimeInMillis: number;

  // AUDIOS FOR CAZARRE
  private audios: any;
  private cazaToofSongs: AudioPart[];
  private jingles: AudioPart[];
  private sounds: AudioPart[];
  private songToPlay: AudioPart;
  private favoriteSong: AudioPart;
  private beatToPlay: AudioPart;
  private project: Project;

  private isShowActive = false;

  private artist: RapperDetails|BeatBoxerDetails;
  private artistName: string;
  
  private points: number;

  // Retrieving guest file info
  private guestFiles: GuestFileInfo[];
  private details: ArtistDetails;

  // Deal with current show part
  private currentPart: ShowPart;
  private currentPartTime: number;
  private currentPartIndex: number = 0;
  private currentPartTimer: any;
  private currentPartStyle: any;
  private currentStateTime : TimeState;
  
  // Deal with global time data
  private globalTimerId: any;
  private elapsedTime: number = 0;

  intervalTimer: any;
  remainingTime: number;

  constructor(private guestService: GuestsService, private gameService: GameService,
    private jingleService: JingleService, private soundService: SoundService,
    private activatedRoute: ActivatedRoute, private notifierService: NotifierService,
    private audioService: AudioService, private countDownService: CountDownService) { 
    this.parts = [];
    this.milestones = [];
    this.itemStyles = [];
  }

  getArtist(artistType: ArtistType, artistName: string){
    this.guestService.getArtistWithName(artistName, artistType).subscribe(
      data => { 
        this.artist = data;
        this.project = this.artist.artistDetails.project;
        this.prepareSongs(this.artist);
      },        
      err => this.notifierService.showAPIError(err)
    );
  }

  prepareSongs(artist: RapperDetails|BeatBoxerDetails): void {
    // Song to play
    this.songToPlay.title = artist.artistDetails.songToPlay.name;
    this.songToPlay.source = 
    this.guestService.getSongUrl(this.artistName, artist.artistDetails.artistType, 1);
    // Favorite song
    this.favoriteSong.title = artist.artistDetails.favoriteSong.name;
    this.favoriteSong.source = 
    this.guestService.getSongUrl(this.artistName, artist.artistDetails.artistType, 2);
    // Beat to play
    if(artist.artistDetails.artistType == ArtistType.Rapper){
      let rapper =  artist as RapperDetails;
      this.beatToPlay.title = rapper.beatToPlay.name;
      this.beatToPlay.source = 
      this.guestService.getSongUrl(this.artistName, ArtistType.Rapper, 3);
    }
  }

  ngOnInit(): void {
    this.artistName = this.activatedRoute.snapshot.params.artistName;
    let artistType = this.activatedRoute.snapshot.params.artistType;
    this.getArtist(artistType, this.artistName);

    this.initData();

    this.DURATION = this.getTotalTime();
    this.remainingTime = this.DURATION;
    this.prepareCountDownTick(this.remainingTime);
    
    this.guestService.getGuestFiles().subscribe(
      data => this.guestFiles = data,
      err =>  console.log(err)
    );
  }

  ngAfterViewInit(): void {
    this.progressBar.setMaxTime(this.remainingTime);
  }
  
  private prepareCountDownTick(duration: number){
    this.countDownService.registerObs(TIMER_NAME, duration, duration,
      (remainingTime: number) => {
        this.progressBar.setRemainingTime(remainingTime);
        this.progressBar.update();
        this.remainingTime = remainingTime;
      },
      (err: string) => console.error(err),
      () => {
        this.progressBar.setRemainingTime(0);
        this.progressBar.update();
        this.onCountDownCompleted();   
      }
    );
  }
  
  private onCountDownCompleted() {
    // throw new Error("Method not implemented.");
  }

  private startShowPart(index:number){
    if(index < this.parts.length){
      let showpart = this.parts[index];
      this.currentPartTime = 0;
      this.startPartTimeInMillis = new Date().getTime();
      this.currentPart = showpart;
      console.log("Starting '" + showpart.name+"'");
      let duration = showpart.durationInMinute * 1000;
      let remaining = duration;

      let partIntervalId = setInterval(() => {
        if(remaining >= 0){
          let computedPercent = (100 * (duration - remaining)) / duration;
          // this.itemStyles[index].width = computedPercent + "%";
          // this.gfdhfudjhdjs = this.formatRemainingTime(remaining);
        } else {
          clearInterval(partIntervalId);
          this.startShowPart(index + 1);
        }
        remaining -= DELAY;
        this.currentPartTime += DELAY;
      }, DELAY);
    } else {
      //TODO finish
    }
  }

  private stopTimer(){
    if(this.intervalTimer){
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
  }

  private toggleTimer() {
    if(this.intervalTimer){
      this.stopTimer();
    }
    else {
    //  this.startTimer();
    }
  }

  private getPart(name:string, duration:number): ShowPart{
    let part = new ShowPart();
    part.durationInMinute = duration;
    part.name = name;
    if(name === 'Promotion'){
      part.description = ">>>>>> Beat street Day à Bayonne dans 2 semaines.\n";
      part.description += ">>>>> Pama qui a repris ce week-end.\n";
      part.description += ">>>>> La tencha, jump around, no underwear, jeudi prochain.\n";
    } else if(name === 'Freestyle'){
      part.description = ">>>>>> Freestyle à theme.\n";
      part.description += ">>>>>> Remplacement des mots.\n";

    } else if(name === 'Question de la plebe'){
      part.description = ">>>>>> Metronome\n";
      part.description += ">>>>>> Manger.\n";
      part.description += ">>>>>> Parler, non respect.\n";
      part.description += ">>>>>> Chamallow (mot test).\n";
      part.description += ">>>>>> Cannelle.\n";
      part.description += ">>>>>> Prod bizarre.\n";

    } else {
      part.description = "Haec igitur lex in amicitia sanciatur, ut neque rogemus res turpes nec faciamus rogati. Turpis enim excusatio est et minime accipienda cum in ceteris peccatis, tum si quis contra rem publicam se amici causa fecisse fateatur. Etenim eo loco, Fanni et Scaevola, locati sumus ut nos longe prospicere oporteat futuros casus rei publicae. Deflexit iam aliquantum de spatio curriculoque consuetudo maiorum."
      part.description = name + part.description + name;
    }
    return part;
  }


  private estimatedTime():string {
    return this._toHHMMSS(this.DURATION);
  }

  private getTotalTime():number {
    let estimated = 0;
    this.parts.forEach(part => {
      estimated += part.getTestDuration()
    });

    // return estimated;
    return 1000 * 60 * 90;
  }

  private initData(){
    this.parts.push(this.getPart("Introduction", 3));
    this.itemStyles.push({'width': "0%", 'height':"3%"});
    this.parts.push(this.getPart("Présentation", 5));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Diffusion", 4));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Décortication", 5));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Favoris", 5));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Diffusion Morceau favoris", 5));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Live", 5));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Freestyle", 5));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Projets", 10));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Chronique Cazarre", 5));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Question de la plebe", 2));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Promotion", 5));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Épreuve de la mort", 8));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Freestyle langue étrangère", 4));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Escape game", 5));
    this.itemStyles.push({'width': "0%"});
    this.parts.push(this.getPart("Quiz classic", 5));
    this.itemStyles.push({'width': "0%"});
  
    this.audios = [
      {name: "Test 1", src:"toof-coquin.mp3"},
      {name: "Test 2", src:"toof-coquin.mp3"},
      {name: "Test 3", src:"toof-coquin.mp3"},
      {name: "Test 4", src:"toof-coquin.mp3"},
      {name: "Test 5", src:"toof-coquin.mp3"},
      {name: "Test 6", src:"toof-coquin.mp3"},
      {name: "Test 7", src:"toof-coquin.mp3"},
      {name: "Test 8", src:"toof-coquin.mp3"},
      {name: "Test 9", src:"toof-coquin.mp3"},
      {name: "Test 10", src:"toof-coquin.mp3"},
      {name: "Test 11", src:"toof-coquin.mp3"},
      {name: "Test 12", src:"toof-coquin.mp3"},
      {name: "Test 13", src:"toof-coquin.mp3"},
      {name: "Test 14", src:"toof-coquin.mp3"},
      {name: "Test 15", src:"toof-coquin.mp3"},
      {name: "Test 16", src:"toof-coquin.mp3"},
      {name: "Test 17", src:"toof-coquin.mp3"},
      {name: "Test 18", src:"toof-coquin.mp3"},
      {name: "Test 19", src:"toof-coquin.mp3"},
      {name: "Test 20", src:"toof-coquin.mp3"},
    ];


    this.cazaToofSongs = this.soundService.getCazaToofSongs();

    this.jingles = this.jingleService.getAllJingles();
    this.sounds = this.soundService.getAllSounds();

    this.songToPlay = new AudioPart();
    this.favoriteSong = new AudioPart();
    this.beatToPlay = new AudioPart();
  }

  private playJingle(jingle:AudioPart){
    this.jingleService.playJingle(jingle);
  }

  private playSound(sound:AudioPart){
    this.soundService.playSound(sound);
  }


  //// PROGRESS
  private exportAsJSON(){
    let showDetails = {
      'durationInMillis': this.elapsedTime,
      'friendlyDuration': this._toHHMMSS(this.elapsedTime),
      'out-of-time': this.milestones.filter(v => !v.inTime).length,
      'points': this.points,
      'guest': 'unknown'
    };
    console.log('details', showDetails);
  }

  private getGuestInfo(fileId: string){
    this.guestService.getGuestInfo(fileId).subscribe(
      data  => {
        this.details = data;
        if(data.artistType == ArtistType.Rapper){
          console.log("This is a new rapper");
          // this.details = data as RapperDetails;
        } else if(data.artistType == ArtistType.Beatboxer){
          console.log("This is a new beatboxer");
          this.details = data;
        } else {
          console.log("Unknown type");
          this.details = null;
        }
      },
      error => console.error(error)
    )
  }

  ////////////////////////////////////////////////////////////////////////

  /*
    GLOBAL PROGRESS BAR
  */

  private startShow(){
    this.countDownService.startCountDown(TIMER_NAME);
    this.startNewPart(this.currentPartIndex);
    this.isShowActive = true;
  }

  private stopShow(){
    this.progressBar.setRemainingTime(0);
    this.progressBar.update();
  }

  private updateGlobalProgressBar(percent:number):void{
    this.globalProgressBarStyle.width = percent + "%";
  }

  private startNewPart(partIndex:number):void{
  
      if(partIndex > 0){ // add milestone
        this.createMilestone(this.currentPart, this.currentPartTime, 
          this.currentStateTime != TimeState.OUT_OF_TIME);
      }

      this.currentPartIndex = partIndex;
      this.currentPart = this.parts[partIndex];
      this.currentPartTime = 0;
      this.currentPartStyle = {'width': "0%", 'background-color':'blue'};
      let delay = 200;
      
      clearInterval(this.currentPartTimer);
      this.currentPartTimer = setInterval(() => {
        this.currentPartTime += delay;

        this.currentStateTime = this.toTimeState(this.currentPartTime, this.currentPart.getTestDuration());
        // update progress-bar
        if(this.currentPartStyle.width != "100%"){
          let percent = 100 * (this.currentPartTime / (this.currentPart.getTestDuration()));
          percent = Math.min(percent, 100);
          this.currentPartStyle.width = Math.min(percent, 100) + "%";
          this.currentPartStyle['background-color'] = this.currentStateTime == TimeState.NORMAL ? 'primary' : 'orange';
        } else {
          this.currentStateTime = TimeState.OUT_OF_TIME;
          this.currentPartStyle['background-color'] = 'red';
        }
      }, delay);
  }

  /**
   * Go to next part
   */
  private nextPart(){
    if(!this.isTheLastPartOfTheShow()){
      this.startNewPart(this.currentPartIndex + 1);
    } else {
      this.finishShow();
    }
  }

  private finishShow():void{
    this.createMilestone(this.currentPart, this.currentPartTime, this.currentStateTime != TimeState.OUT_OF_TIME);
    clearInterval(this.currentPartTimer);
    this.stopShow()
  }

  /**
   * Create a Milestone and add push it into array
   */
  private createMilestone(showpart:ShowPart, elapsedPartTime:number, inTime:boolean):void{
    this.milestones.unshift(new Milestone(new Date(), showpart, elapsedPartTime, inTime));
  }

  /**
   * Returns 'true' if the current part is the last part of the show, 'false' otherwise
   */
  private isTheLastPartOfTheShow():boolean {
    return this.currentPartIndex + 1 >= this.parts.length;
  }

  /**
   * Return current state time as TimeStat
   */
  private toTimeState(current:number, total:number):TimeState{
    return current < 0.8 * total ? TimeState.NORMAL :
      current < total ? TimeState.URGENT : TimeState.URGENT;
  }

  private getTimeStateStyle(state:TimeState):any{
    return getStatusTimeFontStyle(state);
  }

  private isShowFinish():boolean{
    return (this.currentPartIndex == this.parts.length -1) && !this.isShowActive;
  }

  private hasShowBegun():boolean{
    return !(this.currentPartIndex == 0 && !this.isShowActive);
  }

  private setPoints(totalPoint:number){
    this.points = totalPoint;
    console.log(this.points);
  }

  isPause = false;
  hasBegun = false; 

  _toHHMMSS(time: number){
    return formatterUtils.toHHMMSS(time);
  }

}