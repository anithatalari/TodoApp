import { Task } from './task';
export class WebAPI {
    url: string;
    constructor(url: string) {
        this.url = url;
    }
    getAllTask() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            }
            xhr.open("GET", this.url, true);
            xhr.send();
        });
    }
    addTask(title: string) {
        // let task = new Task(title);
        try {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", this.url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 201) {
                    
                        resolve(JSON.parse(xhr.responseText));
                    }
                };

                xhr.send(JSON.stringify({
                    title: title,
                    completed: false
                })
                );
            });
        } catch (e) {
            console.log(e);
        }

    }

    removeTask(id: string) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(xhr.responseText);
                }
            }
            xhr.open("DELETE", this.url + id, true);
            xhr.send();
        });
    }

    updateTask(id: string, completed: boolean, title: string) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("PATCH", this.url + id, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(xhr.responseText);
                }
            };

            xhr.send(JSON.stringify({
                id: id,
                title: title,
                completed:!completed
            })
            );
        }
        );
    }
    removeAllTask() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(xhr.responseText);
                }
            }
            xhr.open("DELETE", this.url, true);
            xhr.send();
        });
    }
}