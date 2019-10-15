import { Component, OnInit } from "@angular/core";
import { TaskItem, TaskViewModel } from "../task/task.model";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";


@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    private taskItems;
    private taskViewModel: TaskViewModel;

    constructor() {
        this.taskViewModel = new TaskViewModel();
    }

    ngOnInit(): void {
        this.taskItems = this.taskViewModel.get('_dataItems');
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

    delete($event) {
        console.log('DELETED');
    }
}
