import { Component, OnInit } from '@angular/core';
import { ShowPart } from '../../model/showpart';
import { Todo } from '../../model/todo';
import { Milestone } from '../../model/milestone';
import { TimeState } from '../../model/time-state';
import { getStatusTimeFontStyle } from '../utils/status-time-handler';

const DELAY = 1000;
const GLOBAL_DELAY = 200;

//TODO: get date from the server
const DATE = new Date("2019-08-24T19:15:00");
const MAXPOINTS = 100;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  barStyle: any = {
    'height': "0%",
    'background-color': 'red'
  };

  getStatusTimeFontStyle: any;

  globalProgressBarStyle: any = {'width': "0%"};
  points: number = 0;

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
  gfdhfudjhdjs: string;

  constructor() { 
    this.parts = [];
    this.milestones = [];
    this.itemStyles = [];
    // this.DURATION = DATE.getTime() - new Date().getTime();
  }

  ngOnInit() {

    //TODO: get data from the server
    this.initData();
    // this.startShowPart(0);


    this.DURATION = this.getTotalTime();
    // this.DURATION = 6 * 1000;
    this.remainingTime = this.DURATION;

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
    part.description = "Haec igitur lex in amicitia sanciatur, ut neque rogemus res turpes nec faciamus rogati. Turpis enim excusatio est et minime accipienda cum in ceteris peccatis, tum si quis contra rem publicam se amici causa fecisse fateatur. Etenim eo loco, Fanni et Scaevola, locati sumus ut nos longe prospicere oporteat futuros casus rei publicae. Deflexit iam aliquantum de spatio curriculoque consuetudo maiorum."
    part.description = name + part.description + name;
    return part;
  }


  private estimatedTime():string {
    return this.toHHMMSS(this.DURATION);
  }

  private getTotalTime():number {
    let estimated = 0;
    this.parts.forEach(part => {
      estimated += part.getTestDuration()
    });
    return estimated;
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
  }

  private reducePoints(): void{
    this.points -= this.getRandomInt(this.points);
  }

  private addPoints(): void {
    this.points += this.getRandomInt(MAXPOINTS);
  }

  private resetPoints(): void {
    this.points = 0;
  }

  private getRandomInt(max:number):number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private toHHMMSS(milliseconds:number) {
    let seconds =  Math.floor(milliseconds / 1000);
    var h, m, s, result='';
    // HOURs
    h = Math.floor(seconds/3600);
    seconds -= h*3600;
    if(h){
        result = h<10 ? '0'+h+':' : h+':';
    }
    // MINUTEs
    m = Math.floor(seconds/60);
    seconds -= m*60;
    result += m<10 ? '0'+m+':' : m+':';
    // SECONDs
    s=seconds%60;
    result += s<10 ? '0'+s : s;
    return result;
  }

  //// PROGRESS
  private exportAsJSON(){
    let showDetails = {
      'durationInMillis': this.elapsedTime,
      'friendlyDuration': this.toHHMMSS(this.elapsedTime),
      'out-of-time': this.milestones.filter(v => !v.inTime).length,
      'points': this.points,
      'guest': 'unknown'
    };
    console.log('details', showDetails);
  }

  ////////////////////////////////////////////////////////////////////////

  /*
    GLOBAL PROGRESS BAR
  */

  private startShow(){
    this.startGlobalTimer(GLOBAL_DELAY);
    this.startNewPart(this.currentPartIndex);
  }

  private stopShow(){
    console.log('FINISH !')
  }

  private startGlobalTimer(interval:number):void{
    let totalTime = this.DURATION;
    this.globalTimerId = setInterval(() => {
      this.elapsedTime += interval;
      if(totalTime > 0){
        totalTime -= interval;
        let percent = 100 * (this.DURATION - totalTime) / this.DURATION;
        this.updateGlobalProgressBar(percent);
        this.remainingTime -= interval;
      } else {
        console.log('stop global timer');
        this.stopGlobalTimer();
      }
    }, interval);
  }

  private stopGlobalTimer(){
    if(this.globalTimerId){
      clearInterval(this.globalTimerId);
      this.globalTimerId = null;
    }
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
    this.stopGlobalTimer();
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
    return (this.currentPartIndex == this.parts.length -1) && !this.isShowActive();
  }

  private isShowActive():boolean{
    return this.globalTimerId != null;
  }

  private hasShowBegun():boolean{
    return !(this.currentPartIndex == 0 && !this.isShowActive());
  }
}