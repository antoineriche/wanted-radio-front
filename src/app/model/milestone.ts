import {ShowPart} from './showpart';

export class Milestone {
    
    date: Date;
    showpart: ShowPart;
    elapsedTimeInMillis: number;

    constructor(date:Date, showpart:ShowPart, time:number) {
        this.date = date;
        this.showpart = showpart;
        this.elapsedTimeInMillis = time;
    }
}