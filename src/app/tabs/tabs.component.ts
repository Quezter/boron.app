import {Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view";
import { Observable } from "tns-core-modules/data/observable";
import { TaskService } from "~/app/task/task.service";

@Component({
    moduleId: module.id,
    selector: "tabs-page",
    templateUrl: "./tabs.component.html"
})
export class TabsComponent implements OnInit {
    public tabSelectedIndex: number = 0;
    public tabViewArgs;

    constructor(
        private routerExtension: RouterExtensions,
        private activeRoute: ActivatedRoute,
        private taskService: TaskService
    ) {

    }

    ngOnInit() {
        this.taskService.taskAdded.subscribe((data) => {
            console.log('Tasks are added - I am in TABS');
            this.tabSelectedIndex = 0;
        })
        this.routerExtension.navigate(
            [
                {
                    outlets: {
                        homeTab: ["home"],
                        taskTab: ["task"]
                    }
                }
            ],
            {
                relativeTo: this.activeRoute
            }
        );
    }

    onLoaded(args) {
        this.tabViewArgs = args;
        console.log('from onLoaded');
        const tabView: TabView = <TabView>args.object;
        const vm = new Observable();
        vm.set("tabSelectedIndex", 0);
        vm.set("tabSelectedIndexResult", "Profile Tab (tabSelectedIndex = 0 )");

        tabView.bindingContext = vm;
    }

    changeTab(args) {
        console.log('from changeTab');
        const vm = (<TabView>args.object).bindingContext;
        vm.set("tabSelectedIndex", 0);
        return;
        const tabSelectedIndex = vm.get("tabSelectedIndex");
        if (tabSelectedIndex === 0) {
            console.log('v nulata sam', --args.newIndex);
            vm.set("tabSelectedIndex", --args.newIndex);
        } else if (tabSelectedIndex === 1) {
            vm.set("tabSelectedIndex", 2);
        } else if (tabSelectedIndex === 2) {
            vm.set("tabSelectedIndex", 0);
        }
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        console.log('from onSelectedIndexChanged');
        if (args.oldIndex !== -1) {
            const newIndex = args.newIndex;
            const vm = (<TabView>args.object).bindingContext;
            if (newIndex === 0) {
                vm.set("tabSelectedIndexResult", "Profile Tab (tabSelectedIndex = 0 )");
            } else if (newIndex === 1) {
                console.log('vlziame v add task')
                this.tabViewArgs = args;
                vm.set("tabSelectedIndexResult", "Stats Tab (tabSelectedIndex = 1 )");
            } else if (newIndex === 2) {
                vm.set("tabSelectedIndexResult", "Settings Tab (tabSelectedIndex = 2 )");
            }
            console.log(`Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`);
        }
    }
}
