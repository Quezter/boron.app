import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TaskRoutingModule } from "./task-routing.module";
import { TaskComponent } from "./task.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TaskRoutingModule
    ],
    declarations: [
        TaskComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TaskModule { }
