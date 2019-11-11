import {Injectable} from "@angular/core";
import {getString, setString} from "tns-core-modules/application-settings";
import {User} from "~/app/shared/user/user.model";

const _CURRENT_USER = "_CURRENT_USER";

@Injectable()
export class BackendService {
    private user: User;
    private serializedUser: string;

    public isUserLoggedIn(): boolean {
        return !!this.user;
    }

    public login(user: User) {
        let that = this;
        return new Promise(function (resolve, reject) {

            setTimeout(() => {
                if (user.name === user.password) {
                    that.serializedUser = JSON.stringify(user);
                    resolve();
                } else {
                    reject({ message:'Invalid Email/Password, For this example both should be same.' })
                }
            }, 1000)
        });
    }

    logout() {
        let that = this;
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                that.serializedUser = "";
                resolve();
            }, 1000)
        });
    }

    private getUser(): string {
        return getString(_CURRENT_USER);
    }

    private setUser(theToken: string) {
        setString(_CURRENT_USER, theToken);
    }

}
