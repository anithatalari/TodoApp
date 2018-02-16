import {Task} from './task';
export class SessionStorage
{
    key:string;
    constructor(key:string)
    {
        this.key=key;
    }
    getAllTask()
    {
        return Promise.resolve(JSON.parse(sessionStorage.getItem(this.key)||'[]'));
    }
    addTask(title:string)
    {
        let data=JSON.parse(sessionStorage.getItem(this.key)||'[]');
        let task=new Task(title);
        data.push(task);
        sessionStorage.setItem(this.key,JSON.stringify(data));
        return Promise.resolve(task);
    }
    removeTask(id:string)
    {
        let data=JSON.parse(sessionStorage.getItem(this.key));
        data=data.filter((e)=>e.id!=id);
        sessionStorage.setItem(this.key,JSON.stringify(data));
        return Promise.resolve(data);

    }
    updateTask(id:string, completed:boolean,title:string)
    {
        let data=JSON.parse(sessionStorage.getItem(this.key));
        let dataIndex=data.findIndex(e=>e.id==id);
        data[dataIndex].completed=!completed;
        sessionStorage.setItem(this.key,JSON.stringify(data));
        return Promise.resolve(data);
    }
    removeAllTask()
    {
        let data=JSON.parse(sessionStorage.getItem(this.key));
        data=data.filter(i=>i.id===-1);
        sessionStorage.setItem(this.key,JSON.stringify(data));
        return Promise.resolve(data);
    }
}