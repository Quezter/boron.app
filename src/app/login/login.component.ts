import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { User } from "../shared/user/user.model";
import { UserService } from "../shared/user/user.service";
import { UtilityService } from "~/app/shared/utility.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import { BackendService } from "~/app/shared/backend.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "app-login",
    providers: [UserService, UtilityService, User],
    moduleId: module.id,
    styleUrls: ["./login.component.css"],
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    @ViewChild('name', {static: false}) textField: ElementRef;
    @ViewChild('password', {static: false}) passwordField: ElementRef;

    private user: User;
    private isLoggingIn = true;
    private usernameError: string = '';
    private passwordError: string = '';
    private loginError: string = '';

    private showPassword: boolean = false;
    private showIcon: string = String.fromCharCode(Number("0xf070")); // eye
    private hideIcon: string = String.fromCharCode(Number("0xf06e")); // eye-slash
    private showHideIcon: string = this.hideIcon;
    private passHasFocus: boolean;
    private usernameHasFocus: boolean;
    private isAuthenticating: boolean;


    constructor(
        private router: Router,
        private userService: UserService,
        private page: Page,
        private backendService: BackendService,
        private routerExtensions: RouterExtensions,
        private utilityService: UtilityService
    ) {
        this.user = new User();
    }

    public hasUsernameErrors() {
        console.log('check for UN errors');
        const hasErrorMsg = !!this.usernameError;

        console.log((hasErrorMsg ? 'has error' : 'not yet') + ' ' + JSON.stringify(this.user));

        if (!hasErrorMsg)
            return false;

        const isValidUsername = this.user.hasUsername() && this.utilityService.isValidUsername(this.user.name);

        let hasError = hasErrorMsg || !isValidUsername;

        if (isValidUsername) {
            this.usernameError = "";
            return false;
        }

        return hasError;
    }

    public hasPasswordErrors() {
        console.log('check for PASS errors');
        return !!this.passwordError;
    }

    public showHidePassword() {
        this.showPassword = !this.showPassword;
        this.showHideIcon = this.showPassword ? this.showIcon : this.hideIcon;
        let passField: TextField = this.passwordField.nativeElement;
        passField.secure = !passField.secure;
    }

    public onPasswordFocus() {
        console.log('password focus');
        this.passHasFocus = true;
        this.updateErrors(false);
    }

    public onUsernameFocus() {
        console.log('username focus');
        this.usernameHasFocus = true;
    }

    private updateErrors(checkPass) {
        if (this.user.hasUsername()) {
            if (this.utilityService.isValidUsername(this.user.name)) {
                this.usernameError = "";
            } else {
                this.usernameError = "Invalid Username"
            }
        } else {
            this.usernameError = "Username cannot be blank"
        }

        if (checkPass) {
            let length = this.user.password.length;
            if (length == 0) {
                this.passwordError = "Password cannot be blank";
            } else {
                this.passwordError = "";
            }
        }
    }

    public getUsernameError() {
        return this.usernameError;
    }

    public getPasswordError() {
        return this.passwordError;
    }

    public hasLoginErrors() {
        return !!this.loginError;
    }

    public getLoginError() {
        return this.loginError;
    }

    private isValidForm() {
        let isValid = !!this.usernameError || !!this.passwordError;
        return !isValid;
    }

    public isSubmitEnabled() {
        return !this.isAuthenticating && this.utilityService.isValidUsername(this.user.name);
    }

    public isTablet() {
        return this.utilityService.isTablet();
    }

    public login() {
        this.updateErrors(true);
        if (this.isValidForm()) {
            this.isAuthenticating = true;

            // Use the backend service to login
            this.backendService.login(this.user)
                .then(() => {
                    this.isAuthenticating = false;
                    this.routerExtensions.navigate(["/home"], { clearHistory:true });
                }).catch(error => {
                this.isAuthenticating = false;
                this.loginError = error.message;
            });
        }
    }

    public setUsername($event) {
        this.user.name = $event.value;
    }

    public ngOnInit() {

    }
}
//
// submit() {
//     if (this.isLoggingIn) {
//         this.login();
//     } else {
//         this.signUp();
//     }
// }
//
// login() {
//     this.userService.login(this.user)
//         .subscribe(
//             () => this.router.navigate(["/list"]),
//             (exception) => {
//                 if (exception.error && exception.error.description) {
//                     alert(exception.error.description);
//                 } else {
//                     alert(exception)
//                 }
//             }
//         );
// }
//
// toggleDisplay() {
//     this.isLoggingIn = !this.isLoggingIn;
// }
//
// signUp() {
//     this.userService.register(this.user)
//         .subscribe(
//             () => {
//                 alert("Your account was successfully created.");
//                 this.toggleDisplay();
//             },
//             (exception) => {
//                 if (exception.error && exception.error.description) {
//                     alert(exception.error.description);
//                 } else {
//                     alert(exception)
//                 }
//             }
//         );
// }
//
// ngOnInit() {
//     this.page.actionBarHidden = true;
// }
