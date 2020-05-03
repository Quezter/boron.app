import {Component, NgZone, OnInit} from "@angular/core";
import { TaskService } from "~/app/task/task.service";
import { TaskItem, TaskViewModel } from "~/app/task/task.model";
import { Router } from "@angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "Add Task",
    styleUrls: ["./task.component.css"],
    templateUrl: "./task.component.html"
})
export class TaskComponent implements OnInit {
    private newTask: TaskItem;
    private action: any;
    private taskViewModel: TaskViewModel;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private zone: NgZone,
        private activeRoute: ActivatedRoute,
    ) {
        this.taskViewModel = new TaskViewModel(taskService);
        this.action = {
            success: null,
            text: '',
            label: ''
        };
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    saveTask(): void {
        this.newTask = new TaskItem(
            null,
            'airplaneMode',
            'Airplane Mode',
            `${this.startHour}:${this.startMinute}`,
            `${this.stopHour}:${this.stopMinute}`);

        this.taskService.create(this.newTask)
            .then(result => {
                if (result.hasOwnProperty('success') && result['success']) {
                    this.action = {
                        success: true,
                        text: 'Successfully added task!!!',
                        label: 'success'
                    };
                    this.taskService.taskAdded.next('Yes');

                    // this.zone.run(() => {
                    //     this.router.navigate(['home']);
                    // });
                } else {
                    this.action = {
                        success: false,
                        text: 'Failed to create a task!',
                        label: 'error'
                    };
                }
            }).catch(error => {
                this.action = {
                    success: false,
                    text: error.message,
                    label: 'error'
                };
            });
    }

    startHour: number = new Date().getHours();
    startMinute: number = new Date().getMinutes();
    stopHour: number = new Date().getHours();
    stopMinute: number = new Date().getMinutes();

    onPickerLoaded($event) {
        const timePicker: TimePicker = <TimePicker> $event.object;

        if (isAndroid) {
            // @ts-ignore
            timePicker.android.setIs24HourView(java.lang.Boolean.TRUE);
            timePicker.hour = 23;
            timePicker.minute = 59;
        }
    }
}
