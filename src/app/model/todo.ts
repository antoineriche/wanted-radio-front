export class Todo {
    
    task: string;
    state: number;
    goals: string;

    constructor(task:string, state:number,goals:string) {
        this.goals = goals;
        this.state = state;
        this.task = task;
    }
}