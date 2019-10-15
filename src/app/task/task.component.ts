import {Component, OnInit} from "@angular/core";

@Component({
    selector: "Add Task",
    styleUrls: ["./task.component.css"],
    templateUrl: "./task.component.html"
})
export class TaskComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    currentHour: number = new Date().getHours();
    currentMinute: number = new Date().getMinutes();
}
