import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "~/app/shared/auth-guard.service";

export const COMPONENTS = [LoginComponent];

const routes: Routes = [
    {
        path: "",
        redirectTo: "/tabs/default",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "tabs",
        loadChildren: "~/app/tabs/tabs.module#TabsModule",
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true })],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule { }
