import { Task } from './task';
import { LocalStorage } from './localStorage';
import { SessionStorage } from './sessionStorage';
import { WebAPI } from './webAPI';
export class ToDoApp {
  heading: string = 'ToDoApp';
  todoDescription: string = '';
  Localkey: string = "todo";
  url = "https://todo-backend-aspnetcore.azurewebsites.net/";
  Storage = new WebAPI(this.url);
  tasks: any = [];
  constructor() {
    this.Storage.getAllTask().then((val) => {
      this.tasks = val;
    }
    )
  }
  onDescriptionKeyup(e) {
    if (e.keyCode !== 13) {
      return;
    }
    if (this.todoDescription.length === 0) {
      return;
    }
    this.addTask(this.todoDescription);

    this.todoDescription = '';
  }
  addTask(description: string) {
    this.Storage.addTask(description).then((e) => {
      this.tasks.push(e) ;
      //this.todoDescription='';
    });
  }

  removeTask(taskId: string) {
    this.Storage.removeTask(taskId).then((e) => {
      const taskIndex=this.tasks.findIndex((i)=>i.id==taskId);
      this.tasks.splice(taskIndex,1);
    });

  }
 
  updateTask(taskid:string, completed:boolean,todoDescription:string) {
    this.Storage.updateTask(taskid, completed,todoDescription).then((e) => {
      const Index=this.tasks.findIndex(i=>i.id==taskid);
      this.tasks[Index].completed=!completed;
      return this.tasks;
    });
  }
  activeTask()
  {
    const filterActive=this.tasks.filter(e=>e.completed===false);
    this.tasks=filterActive;
  return this.tasks;
  }
  allTask()
  {
    this.Storage.getAllTask().then((val)=>this.tasks=val);
    return this.tasks;
  }
  completedTask()
  {
    
    const filterCompleted=this.tasks.filter(e=>e.completed===true);
    this.tasks=filterCompleted;
    return this.tasks;
  }
  deleteAllTasks()
  {
    this.Storage.removeAllTask().then(val=>this.tasks=val)
    this.tasks=this.tasks.filter(i=>i.id===-1);
    return this.tasks;
  }
}
