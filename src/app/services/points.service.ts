import { Injectable } from '@angular/core';
import { AudioService } from './audio.service';

const MAXPOINTS = 100;

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  private points: number = 0;

  constructor(private audioService: AudioService) { }

  private getRandomInt(max:number):number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public reducePoints(endCallback:Function): number{
    this.audioService.playLosePointsSong(endCallback);
    this.points -= this.getRandomInt(this.points);
    return this.points;
  }

  public addPoints(endCallback:Function): number {
    this.audioService.playWinPointsSong(endCallback);
    this.points += this.getRandomInt(MAXPOINTS);
    return this.points;
  }

  public resetPoints(): number {
    this.points = 0;
    return this.points;
  }

  private getPoints(): number {
    return this.points;
  }
}
