import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { TaskItem } from "./task.model";
import { Config } from "../shared/config";
import { getString } from "tns-core-modules/application-settings";

@Injectable()
export class TaskService {
    public taskAdded = new Subject();
    public taskAdded2 = new Subject();

    constructor(private http: HttpClient) { }

    getList(): Observable<TaskItem[]> {
        return this.http
            .get(
                Config.apiUrl + "api/tasks",
                {
                    headers: this.getCommonHeaders()
                })
            .pipe(
                map(tasks => {
                    let taskItems = [];
                    for (let index in tasks) {
                        let task = tasks[index];
                        taskItems.push(
                            new TaskItem(
                                task._id,
                                task.code,
                                task.displayName,
                                task.startTime,
                                task.stopTime
                            )
                        );
                    }
                    return taskItems;
                }),
                catchError(this.handleErrors)
            );
    }

    create(taskData: TaskItem) {
        return this.http
            .post(
                Config.apiUrl + "api/tasks",
                taskData,
                {
                    headers: this.getCommonHeaders()
                }).toPromise();
    }

    getCommonHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + getString('TOKEN')
        }
    }

    handleErrors(error) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
