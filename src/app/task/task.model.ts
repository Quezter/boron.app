import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Observable } from "tns-core-modules/data/observable";
import { TaskService } from "~/app/task/task.service";

export class TaskViewModel extends Observable {
    constructor(private taskService: TaskService) {
        super();
        this.dataItems = new ObservableArray<TaskItem>();

        taskService.getList().subscribe(
            responseData => {
                this.dataItems.push(responseData);
            }
        );
    }

    get dataItems(): ObservableArray<TaskItem> {
        return this.get("_dataItems");
    }

    set dataItems(value: ObservableArray<TaskItem>) {
        this.set("_dataItems", value);
        console.log('a')
    }

    addItem(task: TaskItem) {
        this.dataItems.push(task);
    }
}

export class TaskItem extends Observable {
    public id: number;
    public code: string;
    public displayName: string;
    public startTime: string;
    public stopTime: string;

    constructor(
        id: number,
        code: string,
        displayName: string,
        startTime: string,
        stopTime: string
    ) {
        super();
        this.id = id;
        this.code = code;
        this.displayName = displayName;
        this.startTime = startTime;
        this.stopTime = stopTime;
    }
}
