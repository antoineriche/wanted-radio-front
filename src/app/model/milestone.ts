import {ShowPart} from './showpart';

export class Milestone {
    
    date: Date;
    showpart: ShowPart;
    elapsedTimeInMillis: number;
    inTime: boolean;

    constructor(date:Date, showpart:ShowPart, time:number, inTime: boolean) {
        this.date = date;
        this.showpart = showpart;
        this.elapsedTimeInMillis = time;
        this.inTime = inTime;
    }
}