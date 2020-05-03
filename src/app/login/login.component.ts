import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { User } from "../shared/user/user.model";
import { UserService } from "../shared/user/user.service";
import { UtilityService } from "~/app/shared/utility.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import { BackendService } from "~/app/shared/backend.service";
import { RouterExtensions } from "nativescript-angular/router";
import { setString } from "tns-core-modules/application-settings";

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

    private readonly user: User;

    // Error holders
    private usernameError: string = '';
    private passwordError: string = '';
    private loginError: string = '';

    // Password state properties
    private showPassword: boolean = false;
    private showIcon: string = String.fromCharCode(Number("0xf070")); // eye
    private hideIcon: string = String.fromCharCode(Number("0xf06e")); // eye-slash
    private showHideIcon: string = this.hideIcon;

    // Field focus properties
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
        const hasErrorMsg = !!this.usernameError;

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
        return !!this.passwordError;
    }

    public showHidePassword() {
        this.showPassword = !this.showPassword;
        this.showHideIcon = this.showPassword ? this.showIcon : this.hideIcon;
        let passField: TextField = this.passwordField.nativeElement;
        passField.secure = !passField.secure;
    }

    public onPasswordFocus() {
        this.passHasFocus = true;
        this.updateErrors(true);
    }

    public onUsernameFocus() {
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

    public hasLoginErrors(): boolean {
        return !!this.loginError;
    }

    public getLoginError() {
        return this.loginError;
    }

    private isValidForm(): boolean {
        let isValid = !!this.usernameError || !!this.passwordError;
        return !isValid;
    }

    public isSubmitEnabled(): boolean {
        return !this.isAuthenticating && this.utilityService.isValidUsername(this.user.name);
    }

    public isTablet(): boolean {
        return this.utilityService.isTablet();
    }

    public login(): void {
        this.updateErrors(true);
        if (this.isValidForm()) {
            this.isAuthenticating = true;

            // Use the backend service to login
            this.userService.login(this.user)
                .then(result => {
                    this.isAuthenticating = false;
                    if (result.hasOwnProperty('success') && result['success']) {
                        setString('TOKEN', result['token']);
                        this.routerExtensions.navigate(["tabs/default"], { clearHistory: true });
                    } else {
                        this.loginError = 'Login credentials doesn\'t match';
                    }
                }).catch(error => {
                    console.log('from catch');
                    this.isAuthenticating = false;
                    this.loginError = error.message;
                });
        }
    }

    public setUsername($event) {
        this.user.name = $event.value;
    }

    public setPassword($event) {
        this.user.password = $event.value;
    }

    public ngOnInit() {

    }
}
