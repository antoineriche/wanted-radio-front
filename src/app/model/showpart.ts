export class ShowPart {
    
    name: string;
    durationInMinute: number;
    description: string;

    constructor() {}

    public getRealDuration():number{
        return this.durationInMinute * 60 * 1000;
    }

    public getTestDuration():number{
        return this.durationInMinute * 1000;
    }
}