import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ShowPart } from '../../model/showpart';
import { start } from 'repl';

const DELAY = 100;

//TODO: get date from the server
const DATE = new Date("2019-08-24T19:15:00");

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

  itemStyles: any[];

  timeSlots: string[];
  parts: ShowPart[];
  remain: string;
  
  DURATION: number;

  intervalTimer: any;
  remainingTime: number;
  gfdhfudjhdjs: string;

  constructor() { 
    this.parts = [];
    this.timeSlots = [];
    this.itemStyles = [];
    // this.DURATION = DATE.getTime() - new Date().getTime();
  }

  ngOnInit() {

    //TODO: get data from the server
    this.initData();
    this.startShowPart(0);

    this.DURATION = this.getTotalTime();
    this.remainingTime = this.DURATION;
    this.startTimer();
  }

  private startShowPart(index:number){
    if(index < this.parts.length){
      let showpart = this.parts[index];
      console.log("Starting '" + showpart.name+"'");
      let duration = showpart.durationInMinute * 1000;
      let remaining = duration;

      let partIntervalId = setInterval(() => {
        if(remaining > 0){
          let computedPercent = (100 * (duration - remaining)) / duration;
          this.itemStyles[index].width = computedPercent + "%";
          this.gfdhfudjhdjs = this.formatRemainingTime(remaining);
        } else {
          clearInterval(partIntervalId);
          this.startShowPart(index + 1);
        }
        remaining -= DELAY;
      }, DELAY);
    } else {
      //TODO finish
    }
  }
  private updateCountdown(remainingTime:number){
    let computedPercent = (100 * (this.DURATION - remainingTime)) / this.DURATION;
    this.barStyle.height = computedPercent + "%";
    this.remain = this.formatRemainingTime(this.remainingTime);
  }

  private createTimeSlot(){
    this.timeSlots.push(formatDate(new Date(), "HH:mm:ss", "en-US"))
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
      this.startTimer();
    }
  }

  private startTimer(){
    this.intervalTimer  = setInterval(() => {
      if(this.remainingTime > 0){
        this.remainingTime -= DELAY;
        this.updateCountdown(this.remainingTime);
      } else {
        this.stopTimer();
      }
    }, DELAY);
  }

  private getPart(name:string, duration:number): ShowPart{
    let part = new ShowPart();
    part.durationInMinute = duration;
    part.name = name;
    return part;
  }

  private formatRemainingTime(time: number): string {
    let SECOND = 1000;
    let MINUTE = 60 * SECOND;
    let HOUR = 60 * MINUTE;
    let str = "";
    
    if(time > HOUR){
      let hour = Math.trunc(time / HOUR);
      str += hour > 9 ? hour : "0" + hour;
      str += ":";
      time -= hour * HOUR;
    } else {
      str+= "00:"
    }

    if(time > MINUTE){
      let min = Math.trunc(time / MINUTE);
      str += min > 9 ? min : "0" + min;
      str += ":";
      time -= min * MINUTE;
    } else {
      str+= "00:"
    }

    if(time > SECOND){
      let sec = Math.trunc(time / SECOND);
      str += sec > 9 ? sec : "0" + sec;
      time -= sec * SECOND;
    } else {
      str+= "00"
    }

    return str;
  }

  private estimatedTime():string {
    return this.formatRemainingTime(this.getTotalTime());
  }

  private getTotalTime():number {
    let estimated = 0;
    this.parts.forEach(part => {
      estimated += part.durationInMinute * 1000 * 60
    });
    return estimated;
  }

  private initData(){
    this.parts.push(this.getPart("Introduction", 3));
    this.itemStyles.push({'width': "0%"});
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

  private formatShowPartTime(remaining:number, total:number){
    this.formatRemainingTime(remaining) + " / " + this.formatRemainingTime(total);
  }
}