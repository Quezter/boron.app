import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TaskComponent } from "./task.component";

const routes: Routes = [
    { path: "", redirectTo: "task" },
    { path: "task", component: TaskComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TaskRoutingModule { }
