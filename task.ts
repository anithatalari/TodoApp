export class Task
{
    id:string;
    completed:boolean=false;
    constructor(public title:string)
    {
      this.id=Date.now().toString();
    }
}