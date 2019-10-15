import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Observable } from "tns-core-modules/data/observable";

export class TaskViewModel extends Observable {
    constructor() {
        super();
        this.dataItems = new ObservableArray<TaskItem>();

        for (let i = 0; i < 5; i++) {
            this.dataItems.push(
                new TaskItem(
                    i,
                    "airplaneMode",
                    "Airplane Mode",
                    i + 1 + ":00 AM",
                    i + 2 + ":00 AM"
                )
            );
        }
    }

    get dataItems(): ObservableArray<TaskItem> {
        return this.get("_dataItems");
    }

    set dataItems(value: ObservableArray<TaskItem>) {
        this.set("_dataItems", value);
    }
}

export class TaskItem {
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
        this.id = id;
        this.code = code;
        this.displayName = displayName;
        this.startTime = startTime;
        this.stopTime = stopTime;
    }
}
