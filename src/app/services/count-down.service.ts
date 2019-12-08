import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

const DELAY = 500;

@Injectable({
  providedIn: 'root'
})
export class CountDownService {

  private tickSecond = new Observable<any>((observer: CustomSub) => {
    
    let timerId = setInterval(() => {
      let countDown = this.timers.get(observer.name);
      countDown.remainingTime -= DELAY;

      if(countDown.remainingTime > 0){
        observer.next(countDown.remainingTime);
        this.timers.set(observer.name, countDown);
      } else {
        observer.complete();
        observer.unsubscribe()
      }
    }, DELAY);

    observer.timerId = timerId;
    this.timers.set(observer.name, observer);

    return {
      unsubscribe() {
        window.clearInterval(timerId);
      }};
  });

  private timers: Map<string, CustomSub>;

  constructor() {
    this.timers = new Map();
  }


  startCountDown(name: string){
    this.tickSecond.subscribe(this.timers.get(name));
  }

  pause(name: string) {
    let obs = this.timers.get(name);
    obs.unsubscribe();
  }

  stop(name:string){
    this.timers.get(name).unsubscribe();
    this.timers.delete(name);
  }

  resume(name: string){
    let old = this.timers.get(name);
    this.registerObs(name, old.duration, old.remainingTime, old.next, old.error, old.complete);
    this.startCountDown(name);
  }


  registerObs(name: string, duration: number, remainingTime: number, onNext?: Function, 
    onError?: Function, onCompleted?: Function) {

    if(!onNext){
      onNext = (remainingTime: number) => console.log(remainingTime);
    }

    if(!onError){
      onError = (str) => console.error(str);
    }
    
    if(!onCompleted){
      onCompleted = () => console.log('end');
    }

    let obs = new CustomSub();
    obs.next = (str) => onNext(str);
    obs.error = (err) => onError(err);
    obs.complete = () => onCompleted();
    obs.duration = duration;
    obs.remainingTime = remainingTime;
    obs.name = name;
    this.timers.set(name, obs);
  }
}

class CustomSub extends Subscriber<any>{
  duration: number;
  remainingTime: number;
  name: string;
  timerId: any;
}
