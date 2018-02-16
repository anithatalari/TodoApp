import { Task } from './task';
export class LocalStorage {
    key: string;
    title: string;
    constructor(key: string) {
        this.key = key;
    }
    getAllTask() {
        return Promise.resolve(JSON.parse(localStorage.getItem(this.key) || '[]'));
    }
    addTask(title: string) {
        let data = (JSON.parse(localStorage.getItem(this.key) || '[]'));
        let task = new Task(title);
        data.push(task);
        localStorage.setItem(this.key, JSON.stringify(data));
        return Promise.resolve(task);
    }
    removeTask(id: string) {
        let data = JSON.parse(localStorage.getItem(this.key));
        data = data.filter(i => i.id != id);
        localStorage.setItem(this.key, JSON.stringify(data));
        return Promise.resolve(data);
    }
    updateTask(id: string, completed:boolean,title:string) {
        let data = JSON.parse(localStorage.getItem(this.key) || '[]');
        let dataIndex = data.findIndex((e) => {
            return e.id == id;
        });
        data[dataIndex].completed = !completed;
        localStorage.setItem(this.key, JSON.stringify(data));
        return Promise.resolve(data);
    }
    removeAllTask()
    {
        let data=JSON.parse(localStorage.getItem(this.key));
        data=data.filter(i=>i.id===-1);
        localStorage.setItem(this.key,JSON.stringify(data));
        return Promise.resolve(data);
    }

}