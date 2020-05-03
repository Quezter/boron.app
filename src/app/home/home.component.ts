import { Component, OnInit } from "@angular/core";
import { TaskItem, TaskViewModel } from "../task/task.model";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
import { TaskService } from "~/app/task/task.service";
import { remove } from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { NgZone } from "@angular/core";


@Component({
    selector: "Home",
    providers: [TaskService],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    private taskItems;
    private taskViewModel: TaskViewModel;

    constructor(
        private taskService: TaskService,
        private routerExtensions: RouterExtensions,
        private zone: NgZone
    ) {
        this.taskViewModel = new TaskViewModel(taskService);
    }

    ngOnInit(): void {
        this.taskService.taskAdded.subscribe((data) => {
            console.log('Hello, I am HOME and I am hit by TASK');
        })

        this.taskService.taskAdded2.subscribe((data) => {
            console.log('Hello, I am HOME and I am hit by TABS');
        })

        this.taskItems = new ObservableArray<TaskItem>();

        this.taskService.getList().subscribe(
            responseData => {
                this.taskItems.push(responseData);
            }
        );
    }

    get tasks(): ObservableArray<TaskItem> {
        return this.taskItems;
    }

    onSwipeCellStarted(args: ListViewEventData) {
        let swipeLimits = args.data.swipeLimits;
        let swipeView = args.object;
        let rightItem = swipeView.getViewById<View>("delete-view");
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.left = 0;
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    logOut() {
        remove('TOKEN');
        this.routerExtensions.navigate(["login"], { clearHistory: true });
    }

    refresh() {
        this.taskItems = this.taskViewModel.get('_dataItems');
    }

    delete($event) {
        console.log('DELETED');
    }
}
