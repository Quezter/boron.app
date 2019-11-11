import { Injectable } from "@angular/core";
import { CanActivate, Route } from "@angular/router";
import { BackendService } from "~/app/shared/backend.service";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private backendService: BackendService,
        private routerExtensions: RouterExtensions
    ) {
        // Constructor body
    }

    canActivate() {
        if (this.backendService.isUserLoggedIn()) {
            console.log('USER LOGGED IN');
            return true;
        } else {
            console.log('USER NOT LOGGED IN');
            this.routerExtensions.navigate(["/login"]);
            return false;
        }
    }
}
