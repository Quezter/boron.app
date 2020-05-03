import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule, COMPONENTS } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./shared/auth-guard.service";
import { BackendService } from "~/app/shared/backend.service";
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";

// import { DataService } from "./data.service";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { enable as traceEnable, addCategories } from "tns-core-modules/trace";
import {TaskService} from "~/app/task/task.service";

traceEnable();

export class MyErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log("### ErrorHandler Error: " + error.toString());
        console.log("### ErrorHandler Stack: " + error.stack);
    }
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        ...COMPONENTS
    ],
    providers: [
        AuthGuard,
        BackendService,
        TaskService,
        { provide: ErrorHandler, useClass: MyErrorHandler },
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
